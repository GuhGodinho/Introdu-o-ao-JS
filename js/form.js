var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
	event.preventDefault();
	
	var form = document.querySelector("#form-adiciona");
	var paciente = obtemPacienteDoFormulario(form);

	var erros = validaPaciente(paciente);

	if(erros.length > 0){
		exibeMensagemDeErro(erros);
		return;
	}

	adicionaPacienteNaTabela(paciente);

	form.reset();
	var mensagemErro = document.querySelector("#mensagens-erro");
	mensagemErro.innerHTML = "";

});

function adicionaPacienteNaTabela(paciente) {
	var pacienteTr = montaTr(paciente);
	var tabela = document.querySelector("#tabela-pacientes");
	tabela.appendChild(pacienteTr);
}

function exibeMensagemDeErro(erros){
	var ul = document.querySelector("#mensagens-erro");
	ul.innerHTML = "";

	erros.forEach(function(erro){
		var li = document.createElement("li");
		li.textContent = erro;
		ul.appendChild(li);
	});
}


function obtemPacienteDoFormulario(form){

	var paciente = {
		nome: form.nome.value,
		peso: form.peso.value,
		altura: form.altura.value,
		gordura: form.gordura.value,
		imc: calculaImc(form.peso.value, form.altura.value)
	}

	return paciente;
}

function montaTr(paciente){
	var pacienteTr = document.createElement("tr");
	pacienteTr.classList.add("paciente");


	var nomeTd = document.createElement("td");
	nomeTd.classList.add("info-nome");
	nomeTd.textContent = paciente.nome;

	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
	pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

	return pacienteTr
}

function montaTd(dado,classe){
	var td = document.createElement("td");
	td.textContent = dado;
	td.classList.add(classe);

	return td;
}

function validaPaciente(paciente){

	var erros = []

	if(paciente.nome.length == 0){
		erros.push("Preencha corretamente seu nome")
	}
	if(!validaPeso(paciente.peso)) erros.push("Peso é invalido")
	if(!validaAltura(paciente.altura)) erros.push("Altura é invalida")

	if (paciente.gordura.length == 0){
		erros.push("Gordura não pode ficar em branco")
	}

	if(paciente.peso.length == 0){
		erros.push("Completar o campo Peso")
	}

	if(paciente.altura.length == 0){
		erros.push("Indicar sua Altura")
	}
	
	return erros;
}
