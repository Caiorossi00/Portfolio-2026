const expertiseData = {
  frontend: [
    {
      title: "HTML",
      description: "Estruturo páginas com semântica correta e acessível.",
    },
    {
      title: "CSS / SCSS",
      description:
        "Crio layouts responsivos, animações suaves e design modular.",
    },
    {
      title: "JavaScript / ES6+",
      description:
        "Desenvolvo interações, componentes dinâmicos e manipulação de DOM.",
    },
    {
      title: "React",
      description:
        "Construto interfaces reativas, componentes reutilizáveis e SPA.",
    },
    {
      title: "TypeScript",
      description: "Adiciono tipagem para código mais seguro e escalável.",
    },
    {
      title: "Next.js",
      description: "Desenvolvo aplicações SSR/SSG modernas e performáticas.",
    },
    {
      title: "Tailwind CSS / Design Systems",
      description:
        "Crio estilos consistentes e design tokens para produtividade.",
    },
  ],
  backend: [
    {
      title: "Node.js",
      description: "Desenvolvo APIs escaláveis e server-side logic.",
    },
    {
      title: "Express.js",
      description: "Estruturo rotas, middlewares e controllers eficientes.",
    },
    {
      title: "Databases SQL / NoSQL",
      description: "Modelagem de dados, consultas e otimização de performance.",
    },
    {
      title: "Authentication & Security",
      description:
        "Implemento login, JWT, criptografia e boas práticas de segurança.",
    },
    {
      title: "REST / GraphQL APIs",
      description: "Criação e integração de APIs modernas e performáticas.",
    },
    {
      title: "Serverless / Cloud Functions",
      description: "Executo lógica backend sem gerenciar servidores dedicados.",
    },
  ],
  design: [
    {
      title: "Graphic Design",
      description: "Criação de artes, logos e identidade visual.",
    },
    {
      title: "Motion Design",
      description: "Animações, microinterações e conteúdo dinâmico.",
    },
    {
      title: "Prototyping",
      description: "Prototipagem de produtos e fluxos de usuário.",
    },
    {
      title: "Brand Strategy",
      description: "Desenvolvo conceitos e posicionamento de marca.",
    },
    {
      title: "Typography & Color Theory",
      description: "Escolha de fontes, cores e harmonia visual.",
    },
  ],
  ui: [
    {
      title: "Responsive Layouts",
      description: "Criação de interfaces adaptáveis a todos os dispositivos.",
    },
    {
      title: "Component Libraries",
      description:
        "Desenvolvimento de bibliotecas de componentes reutilizáveis.",
    },
    {
      title: "Design Tokens",
      description: "Padronização de cores, espaçamentos e tipografia.",
    },
    {
      title: "Accessibility (A11y)",
      description: "Interfaces inclusivas e acessíveis.",
    },
    {
      title: "Interactive Elements",
      description: "Botões, formulários e menus com feedback visual claro.",
    },
  ],
};

export function initAboutPage(wrapper) {
  const headers = wrapper.querySelectorAll(".expertise-header");

  headers.forEach((header) => {
    const key = header.dataset.key;
    const contentDiv = header.nextElementSibling;

    if (expertiseData[key]) {
      expertiseData[key].forEach((skill) => {
        const item = document.createElement("div");
        item.className = "expertise-item";

        const h3 = document.createElement("h3");
        h3.textContent = skill.title;

        const p = document.createElement("p");
        p.textContent = skill.description;

        item.appendChild(h3);
        item.appendChild(p);
        contentDiv.appendChild(item);
      });
    }

    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      const isOpen = contentDiv.classList.contains("show");

      headers.forEach((h) => {
        const div = h.nextElementSibling;
        div.classList.remove("show");
        div.style.transition = "none";
      });

      void document.body.offsetHeight;

      headers.forEach((h) => {
        h.nextElementSibling.style.transition =
          "max-height 0.4s ease, opacity 0.4s ease, transform 0.4s ease";
      });

      if (!isOpen) {
        contentDiv.classList.add("show");
      }
    });
  });
}
