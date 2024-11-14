import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-6">
                
                <h2 className="text-3xl font-semibold text-center">
                    <span className="text-gray-900 dark:text-white">A </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                        Developer
                    </span>
                    <span className="text-gray-900 dark:text-white">, </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                        Innovator
                    </span>
                    <span className="text-gray-900 dark:text-white">, and </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
                        Problem Solver
                    </span>
                </h2>
                <p className="text-center text-lg text-gray-600 dark:text-gray-400">
                    I'm Prajwal Sontakke, always striving to learn and create impactful solutions.
                </p>

                <div className="flex space-x-6">
                    <a
                        href="https://github.com/MrHacker8468"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    >
                        <Github size={24} />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/prajwal-sontakke-a51171262/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    >
                        <Linkedin size={24} />
                    </a>

                    <a
                        href="mailto:prajwalsontakke8468@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    >
                        <Mail size={24} />
                    </a>

                    <a
                        href="https://www.instagram.com/prajwal_sontakke_01/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
                    >
                        <Instagram size={24} />
                    </a>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-500 text-center">
                    &copy; {new Date().getFullYear()} Prajwal Sontakke. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
