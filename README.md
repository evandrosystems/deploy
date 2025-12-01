### Deploy via SSH

Esse action realiza o deploy automatizado de arquivos para um servidor remoto via SSH. É útil para projetos onde você deseja publicar arquivos (como sites, sistemas, APIs ou assets) diretamente de um repositório do GitHub.

---

### Funcionalidades

- Executar comandos antes do deploy.
- Enviar diretórios ou arquivos para o servidor.
- Executar comandos após o deploy.

---

### Exemplo de uso

```yaml
- name: Deploy
  uses: evandrosystems/deploy@main
  with:
    host: 192.168.0.1
    user: root
    key: ${{ secrets.KEY }}
    key-permission: 400
    data: /dist
    dir: /home/portfolio
    port: 22
    before-commands: |
      cd /home/portfolio
      chmod -R 755 uploads
    after-commands: |
      cd /home/portfolio
      php artisan migrate
    exclude: |
      .git
      node_modules
      .github
      .docker
```

---

### Parâmetros

Parâmetros obrigatórios:
- [x] `host`: Endereço IP ou domínio do servidor para onde os arquivos serão enviados.
- [x] `user`: Nome do usuário usado na conexão com o servidor.
- [x] `key`: Chave privada SSH.
- [x] `data`: Caminho local do arquivo ou diretório que será enviado para o servidor.
- [x] `dir`: Caminho **absoluto** no servidor onde os arquivos serão salvos.

Parâmetros opcionais:
- [ ] `port`: (padrão: `22`) Porta usada para a conexão SSH.
- [ ] `key-permission`: (padrão: 600) Permissão atribuída à chave privada.
- [ ] `before-commands`: Comandos **executados remotamente antes** do envio dos arquivos.
- [ ] `after-commands`: Comandos **executados após** o envio dos arquivos.
- [ ] `exclude`: Lista de arquivos ou pastas que **não devem ser enviados** no deploy.

---

### Solução de problemas

#### Erro: "Permission denied (publickey)"
- Verifique se a chave pública está correta no servidor.
- Confirme se você está usando a **chave privada correspondente** no GitHub Secret.

#### Arquivos não aparecem no destino
- Verifique o valor de `dir`. O caminho precisa **existir** ou ter permissão de escrita.
- Use `before-commands` para criar diretórios, se necessário.

---

#### Boas práticas de segurança

- Nunca compartilhe a chave privada.
- Use um usuário específico no servidor com permissões limitadas para deploy.
- Mantenha seu repositório e secrets privados, se possível.

---

#### Licença

MIT © <a href="https://evandrosystems.com" target="_blank" rel="noopener noreferrer">evandrosystems</a>
Test