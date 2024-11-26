export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-gray-500">
          Copyright © {new Date().getFullYear()} - Leilani's imagination
        </p>
      </div>
    </footer>
  );
}
