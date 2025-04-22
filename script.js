async function verificarCPF() {
    const cpfInput = document.getElementById('cpf');
    const mensagemElement = document.getElementById('mensagem');
    const cpf = cpfInput.value;

    if (cpf.length !== 11) {
        cpfInput.value = 'CPF inválido!';
        setTimeout(() => {
            cpfInput.value = '';
            mensagemElement.textContent = '';
        }, 3000);
        return;
    }

    try {
        const response = await fetch('https://projeto-pluto.vercel.app/alunos'); // Rota para obter todos os alunos

        if (response.ok) {
            const alunos = await response.json();
            const alunoEncontrado = alunos.find(aluno => aluno.cpf === cpf); // Encontra o aluno pelo CPF

            if (alunoEncontrado) {
                if (alunoEncontrado.status) {
                    cpfInput.value = `Acesso liberado: ${alunoEncontrado.nome}!`;
                    setTimeout(() => {
                        cpfInput.value = '';
                        mensagemElement.textContent = '';
                    }, 3000);
                    // Aqui você pode adicionar a lógica para liberar a catraca
                } else {
                    cpfInput.value = `Acesso bloqueado: ${alunoEncontrado.nome}. Inativo.`;
                    setTimeout(() => {
                        cpfInput.value = '';
                        mensagemElement.textContent = '';
                    }, 3000);
                    // Aqui você pode adicionar a lógica para bloquear a catraca
                }
            } else {
                cpfInput.value = 'Aluno não encontrado!';
                setTimeout(() => {
                    cpfInput.value = '';
                    mensagemElement.textContent = '';
                }, 3000);
                // Aqui você pode adicionar a lógica para bloquear a catraca
            }
        } else {
            cpfInput.value = 'Erro ao verificar!';
            setTimeout(() => {
                cpfInput.value = '';
                mensagemElement.textContent = '';
            }, 3000);
        }
    } catch (error) {
        console.error('Erro:', error);
        cpfInput.value = 'Erro de conexão!';
        setTimeout(() => {
            cpfInput.value = '';
            mensagemElement.textContent = '';
        }, 3000);
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