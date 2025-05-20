
//Componente do footer (Agora tem kk)
export default function Footer() {
  return (
    <footer className="bg-white text-center text-sm text-text-gray py-6 border-t border-border-gray">
      <p>
        &copy; {new Date().getFullYear()} ElementStore. All rights reserved.
      </p>
    </footer>
  );
}
