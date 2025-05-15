## 🚀 Deploy via SSH

Esse action realiza o deploy automatizado de arquivos para um servidor remoto via SSH. É útil para projetos onde você deseja publicar arquivos (como sites, sistemas, APIs ou assets) diretamente de um repositório do GitHub.

---

## 🧰 Funcionalidades

- Conecta-se a um servidor via SSH com chave privada.
- Executa comandos opcionais antes do deploy.
- Envia diretórios ou arquivos para o servidor.
- Permite personalizar porta e caminho de destino.

---

## 📦 Exemplo de uso

```yaml
- name: Deploy
  uses: evandrosystems/deploy@main
  with:
    host: ${{ secrets.HOST }}
    user: ${{ secrets.USERNAME }}
    key: ${{ secrets.PRIVATE_KEY }}
    key-permission: 400
    data: /dist
    dir: ${{ secrets.DIR }}
    port: 22
    before-commands: |
      cd /home/portfolio
      chmod -R 755 uploads
    after-commands: |
      cd /home/portfolio
      rm -rf /uploads
```

---

## ⚙️ Parâmetros

| Parâmetro         | Obrigatório | Descrição                                                                |
|-------------------|-------------|--------------------------------------------------------------------------|
| `host`            | ✅ Sim      | Endereço do servidor (IP ou domínio).                                    |
| `user`            | ✅ Sim      | Usuário do servidor que será utilizado para a conexão                    |
| `key`             | ✅ Sim      | Chave privada SSH (deve ser armazenada como secret).                     |
| `key-permission`  | ❌ Não      | Altera a permissão da chave privada. (Padrão: `600`).                    |
| `data`            | ✅ Sim      | Arquivo ou diretório que será enviado para o servidor.                   |
| `dir`             | ✅ Sim      | Caminho **absoluto** no servidor para onde os arquivos serão enviados.   |
| `port`            | ❌ Não      | Porta do SSH. (Padrão: `22`).                                            |
| `before-commands` | ❌ Não      | Comandos executados **antes** do envio dos arquivos.                     |
| `after-commands`  | ❌ Não      | Comandos executados **depois** do envio dos arquivos.                    |

---

## 🐞 Solução de problemas

### ❓ Erro: "Permission denied (publickey)"
- Verifique se a chave pública está correta no servidor.
- Confirme se você está usando a **chave privada correspondente** no GitHub Secret.

### ❓ Arquivos não aparecem no destino
- Verifique o valor de `dir`. O caminho precisa **existir** ou ter permissão de escrita.
- Use `before-commands` para criar diretórios, se necessário.

---

## 🔒 Boas práticas de segurança

- Nunca compartilhe a chave privada.
- Use um usuário específico no servidor com permissões limitadas para deploy.
- Mantenha seu repositório e secrets privados, se possível.

---

## 📄 Licença

MIT © <a href="https://evandrosystems.com" target="_blank" rel="noopener noreferrer">evandrosystems</a>