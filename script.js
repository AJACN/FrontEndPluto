async function verificarCPF() {
    const cpfInput = document.getElementById('cpf');
    const mensagemElement = document.getElementById('mensagem');
    const cpf = cpfInput.value;

    // Remove classes de cor anteriores
    cpfInput.classList.remove('text-green-500', 'text-red-500', 'text-yellow-500');

    if (cpf.length !== 11) {
        cpfInput.classList.add('text-red-500');
        cpfInput.value = 'CPF inválido!';
        setTimeout(() => {
            cpfInput.value = '';
            cpfInput.classList.remove('text-red-500');
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
                    cpfInput.classList.add('text-green-500');
                    cpfInput.value = `Acesso liberado: ${alunoEncontrado.nome}!`;
                    setTimeout(() => {
                        cpfInput.value = '';
                        cpfInput.classList.remove('text-green-500');
                        mensagemElement.textContent = '';
                    }, 3000);
                    // Aqui você pode adicionar a lógica para liberar a catraca
                } else {
                    cpfInput.classList.add('text-red-500');
                    cpfInput.value = `Acesso bloqueado: ${alunoEncontrado.nome}. Inativo.`;
                    setTimeout(() => {
                        cpfInput.value = '';
                        cpfInput.classList.remove('text-red-500');
                        mensagemElement.textContent = '';
                    }, 3000);
                    // Aqui você pode adicionar a lógica para bloquear a catraca
                }
            } else {
                cpfInput.classList.add('text-yellow-500');
                cpfInput.value = 'Aluno não encontrado!';
                setTimeout(() => {
                    cpfInput.value = '';
                    cpfInput.classList.remove('text-yellow-500');
                    mensagemElement.textContent = '';
                }, 3000);
                // Aqui você pode adicionar a lógica para bloquear a catraca
            }
        } else {
            cpfInput.classList.add('text-red-500');
            cpfInput.value = 'Erro ao verificar!';
            setTimeout(() => {
                cpfInput.value = '';
                cpfInput.classList.remove('text-red-500');
                mensagemElement.textContent = '';
            }, 3000);
        }
    } catch (error) {
        console.error('Erro:', error);
        cpfInput.classList.add('text-red-500');
        cpfInput.value = 'Erro de conexão!';
        setTimeout(() => {
            cpfInput.value = '';
            cpfInput.classList.remove('text-red-500');
            mensagemElement.textContent = '';
        }, 3000);
    }
}

function addToCpf(number) {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput.value.length < 11 && !cpfInput.classList.contains('text-green-500') && !cpfInput.classList.contains('text-red-500') && !cpfInput.classList.contains('text-yellow-500')) {
        cpfInput.value += number;
    }
}

function clearCpf() {
    const cpfInput = document.getElementById('cpf');
    cpfInput.value = '';
    cpfInput.classList.remove('text-green-500', 'text-red-500', 'text-yellow-500');
}