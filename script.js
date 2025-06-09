class AnimadorTexto {
    constructor() {
        this.containerTexto = null;
        this.elementoImagem = null;
        this.intervaloAtual = null;
        this.indiceImagemAtual = 0;

        this.frases = [
            "Oi meu amor, feliz dia dos namorados, hoje é um dia muito especial,",
            "esse é o primeiro de muitos que eu tenho a certeza que eu quero estar do seu lado sempre,",
            "Você me ilumina todos os dias,",
            "e faz com que sua presença seja muito aconchegante para mim.",
            "Você é meu amor, minha paz, minha luz no fim do túnel, eu te amo demais minha princesa!",
        ];

        this.imagens = [
            "Mídia (1).jfif",
            "Mídia (2).jfif",
            "Mídia (3).jfif",
            "Mídia (4).jfif",
            "Mídia (5).jfif",
            "Mídia (6).jfif",
            "Mídia (7).jfif",
            "Mídia (8).jfif",
            "Mídia (9).jfif",
            "Mídia (10).jfif",
            "Mídia (11).jfif"
        ];

        this.configuracao = {
            delayAnimacao: 2000,
            urlImagemPadrao: "Midia (1).jfif"
        };

        this.inicializar();
    }

    inicializar() {
        document.addEventListener("DOMContentLoaded", () => {
            this.armazenarElementos();
            this.vincularEventos();
        });
    }

    armazenarElementos() {
        this.containerTexto = document.querySelector(".text-container p");
        this.elementoImagem = document.querySelector(".new-image");

        if (!this.containerTexto || !this.elementoImagem) {
            console.error("Elementos necessários não encontrados no DOM");
        }
    }

    vincularEventos() {
        const botoes = {
            mudarTexto: document.querySelector(".change-text"),
            mudarImagem: document.querySelector(".change-image"),
            resetar: document.querySelector(".reset")
        };

        if (botoes.mudarTexto) {
            botoes.mudarTexto.addEventListener("click", () => this.limparTexto());
        }
        if (botoes.mudarImagem) {
            botoes.mudarImagem.addEventListener("click", () => this.mudarImagem());
        }
        if (botoes.resetar) {
            botoes.resetar.addEventListener("click", () => this.iniciarAnimacaoTexto());
        }
    }

    limparTexto() {
        this.pararAnimacao();
        if (this.containerTexto) {
            this.containerTexto.textContent = "";
        }
    }

    pararAnimacao() {
        if (this.intervaloAtual) {
            clearInterval(this.intervaloAtual);
            this.intervaloAtual = null;
        }
    }

    async iniciarAnimacaoTexto() {
        this.pararAnimacao();

        if (!this.containerTexto || !this.elementoImagem) {
            console.error("Elementos não disponíveis para animação");
            return;
        }

        this.elementoImagem.src = this.configuracao.urlImagemPadrao;

        let indiceAtual = 0;
        this.containerTexto.textContent = this.frases[indiceAtual];

        this.intervaloAtual = setInterval(() => {
            indiceAtual++;
            if (indiceAtual < this.frases.length) {
                this.containerTexto.textContent = this.frases[indiceAtual];
            } else {
                this.pararAnimacao();
                this.aoCompletarAnimacao();
            }
        }, this.configuracao.delayAnimacao);
    }

    mudarImagem() {
        if (!this.elementoImagem) return;

        this.indiceImagemAtual = (this.indiceImagemAtual + 1) % this.imagens.length;
        this.elementoImagem.src = this.imagens[this.indiceImagemAtual];
    }

    aoCompletarAnimacao() {
        console.log("Animação de texto concluída");
    }

    adicionarFrase(frase) {
        this.frases.push(frase);
    }

    definirVelocidadeAnimacao(milissegundos) {
        this.configuracao.delayAnimacao = milissegundos;
    }

    obterFrases() {
        return [...this.frases];
    }

    definirImagemPadrao(url) {
        this.configuracao.urlImagemPadrao = url;
    }

    obterConfiguracaoAtual() {
        return { ...this.configuracao };
    }
}

// Inicializa o objeto quando o script for carregado
const animadorTexto = new AnimadorTexto();
