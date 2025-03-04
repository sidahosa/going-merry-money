export const metadata = {
    title: "About - Belly Tracker",
    description: "A One Piece-inspired finance tracker for setting sail on your financial journey.",
  };
  
  export default function AboutPage() {
    return (
      <div className="min-h-screen bg-primary-black text-white">
        {/* Main Content */}
        <main className="container mx-auto p-6 max-w-3xl">
          <h1 className="text-5xl font-title text-primary-yellow mb-6">About Belly Tracker</h1>
  
          {/* Description */}
          <section className="mb-8">
            <h2 className="text-3xl font-blackops text-secondary-blue mb-4">What is Belly Tracker?</h2>
            <p className="text-lg font-nunito">
              <strong>Belly Tracker</strong> is a fun and practical finance tracker inspired by the world of{" "}
              <span className="text-primary-red font-bold">One Piece</span>.
              Manage your expenses, set savings goals, and embark on a financial journey across the Grand Line!
            </p>
          </section>
  
          {/* Credits */}
          <section className="mb-8">
            <h2 className="text-3xl font-blackops text-secondary-blue mb-4">Credits</h2>
            <p className="text-lg font-nunito">
              This app is inspired by Eiichiro Oda’s masterpiece, <strong>One Piece</strong>.
              All rights to the One Piece universe belong to their respective owners.
            </p>
          </section>
  
          {/* Social Links */}
          <section>
            <h2 className="text-3xl font-blackops text-secondary-blue mb-4">Connect with Me</h2>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-yellow hover:text-secondary-blue font-nunito"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-yellow hover:text-secondary-blue font-nunito"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-yellow hover:text-secondary-blue font-nunito"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </section>
        </main>
      </div>
    );
  }
  