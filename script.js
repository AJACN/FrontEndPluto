async function verificarCPF() {
    const cpf = document.getElementById('cpf').value;
    const mensagemElement = document.getElementById('mensagem');

    if (cpf.length !== 11) {
        mensagemElement.textContent = 'CPF inválido. O CPF deve conter 11 dígitos.';
        return;
    }

    try {
        const response = await fetch('https://projeto-pluto.vercel.app/alunos'); // Rota para obter todos os alunos

        if (response.ok) {
            const alunos = await response.json();
            const alunoEncontrado = alunos.find(aluno => aluno.cpf === cpf); // Encontra o aluno pelo CPF

            if (alunoEncontrado) {
                if (alunoEncontrado.status) {
                    mensagemElement.textContent = `Acesso liberado para ${alunoEncontrado.nome}!`;
                    // Aqui você pode adicionar a lógica para liberar a catraca
                } else {
                    mensagemElement.textContent = `Acesso bloqueado para ${alunoEncontrado.nome}. Status: Inativo.`;
                    // Aqui você pode adicionar a lógica para bloquear a catraca
                }
            } else {
                mensagemElement.textContent = 'Aluno não encontrado!';
                // Aqui você pode adicionar a lógica para bloquear a catraca
            }
        } else {
            mensagemElement.textContent = 'Erro ao verificar o CPF.';
        }
    } catch (error) {
        console.error('Erro:', error);
        mensagemElement.textContent = 'Erro ao conectar com o servidor.';
    }
}

function addToCpf(number) {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput.value.length < 11) {
        cpfInput.value += number;
    }
}

function clearCpf() {
    const cpfInput = document.getElementById('cpf');
    cpfInput.value = cpfInput.value.slice(0, -1); // Remove o último dígito
}