const $$$ = x => document.createElement(x)

const label2word = {
    "asm": "Assembly",
    "wasm": "WebAssembly",
    "c": "C",
    "cpp": "C++",
    "csharp": "C#",
    "dotnet": ".NET",
    "gcc": "GCC",
    "clang": "Clang",
    "cmake": "CMake",
    "msvc": "MSVC",
    "java": "Java",
    "py": "Python",
    "go": "Golang",
    "rs": "Rust",
    "vb": "Visual Basic",
    "js": "JavaScript",
    "ts": "TypeScript",
    "kt": "Kotlin",
    "hs": "Haskell",
    "lsp": "Lisp",
    "sc": "Scheme",
    "lua": "Lua",
    "scr": "Scratch",

    "md": "Markdown",
    "latex": "LaTeX",

    "sb": "Spring Boot",

    "fp": "Functional Programming",
    "pl": "Programming Language",
    "ml": "Machine Learning",
    "dl": "Deep Learning",
    "ai": "Artificial Intelligence",

    "linux": "Linux",

    "vs": "Microsoft Visual Studio",
    "vsc": "Visual Studio Code",
    "idea": "IntelliJ IDEA",
    "as": "Android Studio",
}

function addBlog(root, author, avatar, title, description, likes, favorites, labels, id) {
    let ele = $$$("li");
    ele.classList.add("blog");

    let eba = $$$('div');
    eba.classList.add('blog-author');
    let ebta = $$$('div');
    ebta.classList.add('blog-title-avatar');
    ebta.style.backgroundImage = 'url(' + avatar + ')';
    eba.appendChild(ebta);
    let eban = $$$('a');
    eban.classList.add('blog-author-name');
    eban.innerText = author;
    eba.appendChild(eban);
    ele.appendChild(eba);

    let ebtw = $$$("div");
    ebtw.classList.add('blog-title-wrapper');

    let ebt = $$$("a");
    ebt.href = "../showblog/showblog.html?id=" + id;
    ebt.classList.add('blog-title');
    ebt.innerText = title;
    ebtw.appendChild(ebt);

    let lab = $$$('div');
    lab.classList.add('labels')
    let n;
    for (let i = 0; i < labels.length; i++) {
        n = $$$('div');
        n.classList.add('label');
        n.classList.add(labels[i]);
        n.innerText = label2word[labels[i]];
        lab.appendChild(n)
    }
    ebtw.appendChild(lab);

    let ebdw = $$$('div');
    ebdw.classList.add('blog-description-wrapper')

    let ebd = $$$("p");
    ebd.classList.add('blog-description');
    ebd.innerText = description;
    ebdw.appendChild(ebd);

    let popular = $$$('p');
    popular.classList.add('popular');
    popular.innerHTML = "<span class=\"popular-num\">" + likes.toString() + "</span>\n" +
        "&nbsp;likes&nbsp;&nbsp;\n" +
        "<span class=\"popular-num\">" + favorites.toString() + "</span>\n" +
        "&nbsp;favorites";
    ebdw.appendChild(popular);

    ele.appendChild(ebtw);
    ele.appendChild(ebdw);

    root.appendChild(ele);
}