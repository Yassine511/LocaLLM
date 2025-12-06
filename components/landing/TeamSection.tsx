import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const team = [
    {
        name: "Mohamed Aziz Missaoui",
        role: "R&D Lead",
        quote: "Privacy is a god-given right; building this fights big corporates.",
        initials: "MM"
    },
    {
        name: "Yassine Maazouz",
        role: "Development/Marketing Lead",
        quote: "Data privacy protects from misuse.",
        initials: "YM"
    },
    {
        name: "Yassine El Gares",
        role: "Development Lead",
        quote: "High market potential; trust the team.",
        initials: "YE"
    }
]

export function TeamSection() {
    return (
        <section className="bg-black py-24 text-white" id="team">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Meet the Team</h2>
                    <p className="text-zinc-400">The minds behind the secure AI revolution.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {team.map((member) => (
                        <Card key={member.name} className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-12 w-12 border border-white/10">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-zinc-800 text-white">{member.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-lg font-semibold text-white">{member.name}</CardTitle>
                                    <CardDescription className="text-zinc-400">{member.role}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm italic text-zinc-300">"{member.quote}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
