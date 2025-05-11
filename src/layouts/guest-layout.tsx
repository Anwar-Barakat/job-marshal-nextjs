import { Footer, Navbar } from "@/components/general";
import { ThemeProvider } from "@/components/providers/theme-provider"

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            {children}
            <Footer />
        </div>
    </ThemeProvider>
};

export default GuestLayout;