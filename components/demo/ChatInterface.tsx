"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Send, Plus, MessageSquare, ShieldCheck, AlertTriangle, Paperclip, X, FileText, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

// Use environment variable for API key - set NEXT_PUBLIC_GOOGLE_API_KEY in your .env.local file
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
}

type Chat = {
    id: string
    title: string
    messages: Message[]
    date: Date
}

export function ChatInterface() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [selectedModel, setSelectedModel] = useState("gpt-oss")
    const [chats, setChats] = useState<Chat[]>([
        {
            id: "1",
            title: "Welcome to LocaLLM",
            date: new Date(),
            messages: [
                {
                    id: "1",
                    role: "assistant",
                    content: "Hello! I'm your secure local AI assistant. I'm running entirely on your on-premise infrastructure. How can I help you today?"
                }
            ]
        }
    ])
    const [currentChatId, setCurrentChatId] = useState<string>("1")
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [attachedFile, setAttachedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const currentChat = chats.find(c => c.id === currentChatId) || chats[0]

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [currentChat.messages, isLoading])

    const handleNewChat = () => {
        const newChat: Chat = {
            id: Date.now().toString(),
            title: "New Conversation",
            date: new Date(),
            messages: []
        }
        setChats(prev => [newChat, ...prev])
        setCurrentChatId(newChat.id)
    }

    // Helper function to convert file to base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                const result = reader.result as string
                // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
                const base64 = result.split(',')[1]
                resolve(base64)
            }
            reader.onerror = error => reject(error)
        })
    }

    const handleSend = async () => {
        if (!input.trim() && !attachedFile) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input + (attachedFile ? `\n📎 [Attached: ${attachedFile.name}]` : "")
        }

        setChats(prev => prev.map(chat =>
            chat.id === currentChatId
                ? { ...chat, messages: [...chat.messages, userMessage] }
                : chat
        ))

        const userInput = input
        const fileToSend = attachedFile
        setInput("")
        setAttachedFile(null)
        setIsLoading(true)

        try {
            // Get conversation history for context
            const currentMessages = chats.find(c => c.id === currentChatId)?.messages || []
            const conversationHistory = [...currentMessages, userMessage]
            
            // Build contents array for Gemini API
            const contents = await Promise.all(conversationHistory.map(async (msg, index) => {
                const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = []
                
                // Add text content
                if (msg.content) {
                    // Remove the file attachment indicator from the text sent to API
                    const cleanContent = msg.content.replace(/\n📎 \[Attached: .+\]$/, '')
                    if (cleanContent.trim()) {
                        parts.push({ text: cleanContent })
                    }
                }
                
                // If this is the last user message and we have a file, add it
                if (index === conversationHistory.length - 1 && msg.role === "user" && fileToSend) {
                    const base64Data = await fileToBase64(fileToSend)
                    const mimeType = fileToSend.type || 'application/pdf'
                    
                    parts.push({
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data
                        }
                    })
                    
                    // Add instruction about the file if no text was provided
                    if (!userInput.trim()) {
                        parts.unshift({ text: "Please analyze this document and provide a summary." })
                    }
                }
                
                // Ensure parts is not empty
                if (parts.length === 0) {
                    parts.push({ text: msg.content || " " })
                }
                
                return {
                    role: msg.role === "user" ? "user" : "model",
                    parts: parts
                }
            }))

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: contents,
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 4096,
                        },
                        safetySettings: [
                            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                        ],
                    }),
                }
            )

            const data = await response.json()
            
            let assistantContent = "I apologize, but I couldn't generate a response. Please try again."
            
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                assistantContent = data.candidates[0].content.parts[0].text
            } else if (data.error) {
                assistantContent = `Error: ${data.error.message || "Unknown error occurred"}`
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: assistantContent
            }

            setChats(prev => prev.map(chat =>
                chat.id === currentChatId
                    ? { ...chat, messages: [...chat.messages, assistantMessage] }
                    : chat
            ))
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I apologize, but there was an error connecting to the AI service. Please check your connection and try again."
            }

            setChats(prev => prev.map(chat =>
                chat.id === currentChatId
                    ? { ...chat, messages: [...chat.messages, errorMessage] }
                    : chat
            ))
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachedFile(e.target.files[0])
        }
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-black text-white">
            {/* Sidebar - Desktop */}
            <div className="hidden w-[260px] flex-col border-r border-white/10 bg-zinc-950 md:flex">
                <div className="p-4">
                    <Button
                        onClick={handleNewChat}
                        variant="outline"
                        className="w-full justify-start gap-2 border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
                    >
                        <Plus className="h-4 w-4" />
                        New Chat
                    </Button>
                </div>

                <ScrollArea className="flex-1 px-2">
                    <div className="space-y-2 p-2">
                        <p className="px-2 text-xs font-medium text-zinc-500">History</p>
                        {chats.map(chat => (
                            <Button
                                key={chat.id}
                                variant={currentChatId === chat.id ? "secondary" : "ghost"}
                                onClick={() => setCurrentChatId(chat.id)}
                                className={cn(
                                    "w-full justify-start gap-2 px-2",
                                    currentChatId === chat.id
                                        ? "bg-zinc-800 text-white"
                                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                )}
                            >
                                <MessageSquare className="h-4 w-4" />
                                <span className="truncate">{chat.title}</span>
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Sidebar - Mobile */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="left" className="w-[260px] border-r border-white/10 bg-zinc-950 p-0">
                    <SheetTitle className="sr-only">Chat History</SheetTitle>
                    <div className="flex h-full flex-col">
                        <div className="p-4">
                            <Button
                                onClick={() => {
                                    handleNewChat()
                                    setIsMobileMenuOpen(false)
                                }}
                                variant="outline"
                                className="w-full justify-start gap-2 border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
                            >
                                <Plus className="h-4 w-4" />
                                New Chat
                            </Button>
                        </div>
                        <ScrollArea className="flex-1 px-2">
                            <div className="space-y-2 p-2">
                                <p className="px-2 text-xs font-medium text-zinc-500">History</p>
                                {chats.map(chat => (
                                    <Button
                                        key={chat.id}
                                        variant={currentChatId === chat.id ? "secondary" : "ghost"}
                                        onClick={() => {
                                            setCurrentChatId(chat.id)
                                            setIsMobileMenuOpen(false)
                                        }}
                                        className={cn(
                                            "w-full justify-start gap-2 px-2",
                                            currentChatId === chat.id
                                                ? "bg-zinc-800 text-white"
                                                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                                        )}
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        <span className="truncate">{chat.title}</span>
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main Chat Area */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header className="flex h-14 items-center justify-between border-b border-white/10 px-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-white hover:bg-white/10 -ml-2"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-500">
                            <ShieldCheck className="h-3 w-3" />
                            <span>Secure Connection</span>
                        </div>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
                    <div className="mx-auto max-w-3xl space-y-6">
                        {currentChat.messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex gap-4",
                                    message.role === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                {message.role === "assistant" && (
                                    <Avatar className="h-8 w-8 border border-white/10">
                                        <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        "rounded-2xl px-4 py-2 max-w-[80%]",
                                        message.role === "user"
                                            ? "bg-white text-black"
                                            : "bg-zinc-900 text-zinc-300 border border-white/10"
                                    )}
                                >
                                    {message.content}
                                    {message.content.includes("API key") && (
                                        <div className="mt-2 flex items-center gap-2 rounded bg-red-500/10 p-2 text-xs text-red-400">
                                            <AlertTriangle className="h-3 w-3" />
                                            <span>System Alert: Missing Credentials</span>
                                        </div>
                                    )}
                                </div>
                                {message.role === "user" && (
                                    <Avatar className="h-8 w-8 border border-white/10">
                                        <AvatarFallback className="bg-zinc-700 text-white">U</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-4">
                                <Avatar className="h-8 w-8 border border-white/10">
                                    <AvatarFallback className="bg-blue-600 text-white">AI</AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-2">
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: "0ms" }} />
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: "150ms" }} />
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <div className="p-4">
                    <div className="mx-auto max-w-3xl">
                        {attachedFile && (
                            <div className="mb-2 flex items-center gap-2 rounded-md border border-white/10 bg-zinc-900 p-2 text-sm text-zinc-300">
                                <FileText className="h-4 w-4" />
                                <span className="flex-1 truncate">{attachedFile.name}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:bg-zinc-800"
                                    onClick={() => setAttachedFile(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        <div className="relative flex items-center gap-2 rounded-3xl border border-white/10 bg-zinc-900 p-2 pl-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileSelect}
                                accept="application/pdf,image/png,image/jpeg,image/webp,image/gif,text/plain"
                                title="Upload a file"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Paperclip className="h-4 w-4" />
                            </Button>

                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Message LocaLLM..."
                                className="h-10 flex-1 border-0 bg-transparent p-0 text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />

                            <Select value={selectedModel} onValueChange={setSelectedModel}>
                                <SelectTrigger className="h-8 w-[140px] border-0 bg-zinc-800 text-xs text-white focus:ring-0">
                                    <SelectValue placeholder="Model" />
                                </SelectTrigger>
                                <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
                                    <SelectItem value="gpt-oss">GPT OSS</SelectItem>
                                    <SelectItem value="deepseek">DeepSeek R1</SelectItem>
                                    <SelectItem value="llama">Llama 3 70B</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                size="icon"
                                onClick={handleSend}
                                className="h-8 w-8 rounded-full bg-white text-black hover:bg-zinc-200"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="mt-2 text-center text-xs text-zinc-600">
                            LocaLLM can make mistakes. Consider checking important information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
