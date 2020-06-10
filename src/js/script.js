document.addEventListener("readystatechange", function () {
	if (document.readyState === "complete") {
		let inputValorProduto = document.getElementById("valorProduto");
		let inputFrete = document.getElementById("valorFrete");
		let inputTaxa = document.getElementById("valorTaxa");
		let valorCalculado = document.getElementById("valorCalculado");
		let boxNotice = document.getElementById("boxNotice");

		localStorage.getItem("valorTaxa")
			? (inputTaxa.value = parseFloat(
					localStorage.getItem("valorTaxa").replace(",", ".")
			  )
					.toFixed(2)
					.replace(".", ","))
			: (inputTaxa.value = "");

		const salvarTaxa = () => {
			localStorage.setItem("valorTaxa", inputTaxa.value);
		};

		inputValorProduto.addEventListener("input", () => {
			validate();
		});
		inputFrete.addEventListener("input", () => {
			validate();
		});
		inputTaxa.addEventListener("input", () => {
			validate();
			salvarTaxa();
		});
		const validator = () => {
			if (
				inputValorProduto.value == "" ||
				inputFrete.value == "" ||
				inputTaxa.value == ""
			) {
				showNotice();
				console.log("Nao valido");
				return false;
			} else {
				hideNotice();
				console.log("valido");
				return true;
			}
		};
		const validate = () => {
			const isValid = validator();
			console.log(isValid);
			if (isValid) {
				valorProduto = parseFloat(inputValorProduto.value.replace(",", "."));
				valorFrete = parseFloat(inputFrete.value.replace(",", "."));
				valorTaxa = parseFloat(inputTaxa.value.replace(",", "."));
				valorComissao = (valorProduto + valorFrete) * (valorTaxa / 100);
				valorRecebe = valorProduto - valorComissao;

				valorCalculado.innerHTML =
					"Você receberá: R$" + valorRecebe.toFixed(2).replace(".", ",");
				valorCalculado.style.opacity = 0;
				valorCalculado.style.display = "flex";
				setTimeout(() => {
					valorCalculado.style.opacity = 1;
				}, 500);
			} else {
				valorCalculado.style.opacity = 0;
				setTimeout(() => {
					valorCalculado.style.display = "none";
				}, 500);
			}
		};
		const showNotice = () => {
			boxNotice.style.opacity = 0;
			boxNotice.style.display = "flex";
			setTimeout(() => {
				boxNotice.style.opacity = 1;
			}, 500);
		};
		const hideNotice = () => {
			boxNotice.style.opacity = 0;
			setTimeout(() => {
				boxNotice.style.display = "none";
			}, 500);
		};

		let modal = document.querySelectorAll(".modal")[0];

		let openerModal = document.querySelectorAll(".help")[0];
		openerModal.addEventListener("click", () => {
			modal.style.opacity = 0;
			modal.style.display = "block";
			setTimeout(() => {
				modal.style.opacity = 1;
			}, 200);
		});

		let closeModal = document.querySelectorAll(".close")[0];
		closeModal.addEventListener("click", () => {
			modal.style.opacity = 0;
			setTimeout(() => {
				modal.style.display = "none";
			}, 200);
		});
	}
});
