export const Footer = () => {
  return (
    <>
      <footer>
        <div className="mx-auto mt-20 w-full max-w-[1024px]">
          <div className="px-4 py-6 flex justify-center">
            <span className="text-sm text-lite-600">
              Hecho con ♥ por{" "}
              <a
                className="hover:underline"
                href="https://github.com/EliezerMezaDev"
                target="_blank"
              >
                Eliezer A Meza
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
