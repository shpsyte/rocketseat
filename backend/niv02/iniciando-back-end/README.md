# Recuperacao de senha
**RF**
- O usuário deve poder recuperar sua senha informando seu email
- O usuário deve receber um email com instruções de recuperação de senha
- O usuáro deve poder resetar sua senha

**RNF**
- Utilizar Mailtrap para testar envios de ambiente de teste
- Utilizar o Amazon SES para envios em produção
- O envio de email deve acontecer em segundo plano, como um backgroud job

**RN**
- O link enviado por email deve espirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha


# Atualização do perfil
**RF**
- O usuário deve poder atualizar seu nome, email, senha

**RNF**


**RN**
- O usuário não pode alterar seu email para um email já utilizado
- Para atualizar sua senha o usuário deve informar sua senha antiga
- Para atualizar sua senha o usuário precisa confirmar a nova senha

# Painel do prestador
**RF**
- O usuário deve pode listar todos os agendamentos de algum dia especifico
- O prestador deve receber uma notificacao sempre que houver um novo agendamento
- O prestador deve poder ler as notificação não lidas

**RNF**
- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no mongoDB;
- As notificações do prestador devm ser enviadas em tempo-real utilziando o socket.io

**RN**
- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar


# Agendamento de serviços
**RF**
- O usuário deve poder listar todos os prestadores de servicos cadastrados
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
- O usuário deve pode listar horários disponível em um dia especifico de um prestador
- O usuário deve pode realizar um novo agendamento com um prestador

**RNF**
- A listagem de prestadores devem ser armazenada em cache


**RN**
- Todo agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponiveis entre 8h as 18h (8-17h)
- O usuário não pode agendar em um horário já ocupado
- O usuário não pode agendar em um horário que já passou
- O usuário não pode agendar serviços consigo mesmo
