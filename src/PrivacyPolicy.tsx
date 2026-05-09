import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background text-text-primary pt-32 pb-24">
      <div className="container-custom max-w-4xl">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-accent hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-sm uppercase tracking-widest">Voltar para o início</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Política de Privacidade</h1>
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-12">Última atualização: 25/03/2026</p>

          <div className="space-y-12 text-text-secondary leading-relaxed text-lg font-light">
            <section>
              <p>
                O <strong>INSTITUTO MECURA</strong> é o responsável pelo tratamento de dados pessoais coletados por meio do nosso site e plataformas associadas (“Plataforma”).
              </p>
              <p className="mt-4">
                Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos, compartilhamos e protegemos seus dados pessoais. Ao utilizar a Plataforma, você declara ter lido e compreendido os termos abaixo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">1. Informações Gerais</h2>
              <ul className="space-y-4 list-none">
                <li><strong className="text-white">1.1</strong> Esta Política de Privacidade explica como o INSTITUTO MECURA realiza o tratamento de dados pessoais no site e demais serviços digitais ("Plataforma"), em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018 – LGPD).</li>
                <li><strong className="text-white">1.2</strong> Ao se cadastrar ou utilizar a Plataforma, você declara estar ciente e de acordo com esta Política.</li>
                <li><strong className="text-white">1.3</strong> Salvo disposição em contrário, esta Política é regida pelas leis da República Federativa do Brasil.</li>
                <li><strong className="text-white">1.4</strong> O Instituto Mecura elege o Foro da Comarca de São Paulo/SP para discussão de quaisquer demandas originadas desta Política, em prejuízo de qualquer outro, por mais privilegiado que seja.</li>
                <li><strong className="text-white">1.5</strong> Esta Política poderá ser atualizada a qualquer momento em razão de mudanças legais, regulatórias, técnicas ou de negócio. Quando houver alterações relevantes, poderemos comunicar por meio da Plataforma ou outros canais.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">2. Quem é o controlador e quem é o encarregado</h2>
              <ul className="space-y-4 list-none">
                <li><strong className="text-white">2.1</strong> O Instituto Mecura atua como Controlador de Dados Pessoais. Controlador é quem toma as decisões sobre o tratamento de dados pessoais.</li>
                <li><strong className="text-white">2.2</strong> O Instituto Mecura pode contratar terceiros para atuarem como Operadores de Dados Pessoais, responsáveis por tratar dados em seu nome, sempre sob instruções do Instituto e com obrigações contratuais de segurança e confidencialidade.</li>
                <li><strong className="text-white">2.3</strong> O Instituto Mecura possui um Encarregado de Proteção de Dados (DPO), responsável por receber comunicações dos titulares e da Autoridade Nacional de Proteção de Dados (ANPD) e adotar as medidas necessárias. O contato pode ser feito pelo e-mail contato@institutomecura.com.br, conforme item 14 desta Política.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">3. Quais dados coletamos</h2>
              <p className="mb-6">Coletamos apenas os dados necessários para permitir o funcionamento da Plataforma, realização de consultas, uso de funcionalidades e cumprimento de obrigações legais e regulatórias.</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-white mb-3">3.1 Dados pessoais</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nome completo</li>
                    <li>CPF</li>
                    <li>E-mail</li>
                    <li>Telefone</li>
                    <li>Endereço (quando necessário para suporte administrativo ou entrega de documentos)</li>
                    <li>Data de nascimento</li>
                    <li>Dados de login e autenticação</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">3.2 Dados sensíveis (LGPD – art. 5º, II)</h3>
                  <p className="mb-3">Coletados somente quando necessários para assistência à saúde e uso dos serviços médicos disponíveis na Plataforma:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Informações clínicas fornecidas voluntariamente (anamnese, sintomas, histórico médico)</li>
                    <li>Informações geradas em teleconsulta</li>
                    <li>Registro de prescrição médica (quando emitida por profissional habilitado)</li>
                    <li>Informações sobre evolução do tratamento e acompanhamento clínico</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">3.3 Dados de pagamento</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nome do titular do cartão</li>
                    <li>Dados tokenizados e criptografados via gateways de pagamento parceiros</li>
                  </ul>
                  <p className="mt-3">O Instituto Mecura não armazena o número completo do cartão de crédito, que é tratado diretamente pelo prestador de serviços de pagamento.</p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">3.4 Dados de uso e desempenho</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ações realizadas dentro da Plataforma (cliques, telas acessadas, fluxo de navegação)</li>
                    <li>Tempo de sessão</li>
                    <li>Interações com notificações e mensagens enviadas pela Plataforma</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">3.5 Identificadores de dispositivo</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Device ID</li>
                    <li>Endereço IP</li>
                    <li>Modelo do aparelho, versão do sistema operacional e informações técnicas semelhantes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">3.6 Cookies e tecnologias similares</h3>
                  <p className="mb-3">Utilizados para:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Lembrar preferências</li>
                    <li>Melhorar navegação</li>
                    <li>Estatísticas de uso</li>
                    <li>Segurança e prevenção à fraude</li>
                  </ul>
                  <p className="mt-3">Nenhum dado sensível é usado para publicidade.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">4. Para que utilizamos seus dados (Finalidades)</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-white mb-3">4.1 Funcionamento da Plataforma</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Criar, autenticar e gerenciar contas de usuários</li>
                    <li>Permitir teleconsultas e outras funcionalidades médicas</li>
                    <li>Registrar informações clínicas fornecidas durante a consulta</li>
                    <li>Garantir segurança, estabilidade e integridade da Plataforma</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">4.2 Finalidade médica e assistência à saúde</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Suporte ao profissional de saúde que realizará a consulta e o acompanhamento</li>
                    <li>Organização de informações clínicas necessárias para avaliação, prescrição e orientações médicas</li>
                    <li>Registro de dados necessários para cumprimento de normas de telemedicina e tratamentos regulados</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">4.3 Segurança, prevenção a fraudes e conformidade</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Verificação de identidade e prevenção a acessos indevidos</li>
                    <li>Prevenção, detecção e investigação de comportamentos suspeitos ou ilícitos</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">4.4 Comunicação com o usuário</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Envio de notificações importantes sobre uso da Plataforma</li>
                    <li>Confirmação, lembretes e atualizações de consultas</li>
                    <li>Mensagens transacionais de segurança</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">4.5 Marketing e relacionamento</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Envio de comunicações institucionais, informativas ou sobre funcionalidades</li>
                    <li>Envio de campanhas e conteúdos relacionados aos serviços do Instituto Mecura, sempre com possibilidade de descadastramento</li>
                  </ul>
                  <p className="mt-3">Não utilizamos dados sensíveis para publicidade. Não fazemos perfilhamento comercial para venda de dados a terceiros.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">5. Bases legais utilizadas</h2>
              <p className="mb-4">Tratamos seus dados em conformidade com a LGPD, com base nas seguintes hipóteses legais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Execução de contrato:</strong> para prestar os serviços da Plataforma, realizar consultas, processar pagamentos e cumprir os termos de uso.</li>
                <li><strong>Consentimento:</strong> para tratamentos específicos, como uso de determinados cookies e tratamento de dados sensíveis quando exigido por lei.</li>
                <li><strong>Legítimo interesse:</strong> para melhoria de serviços, segurança, prevenção a fraudes e comunicações de relacionamento.</li>
                <li><strong>Obrigação legal ou regulatória:</strong> para cumprir normas de saúde, telemedicina, guarda de registros e outras obrigações.</li>
                <li><strong>Proteção da saúde:</strong> para assistência durante a consulta e procedimentos realizados por profissionais de saúde.</li>
                <li><strong>Proteção da vida:</strong> em situações de risco à vida ou à integridade física do titular ou de terceiros.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">6. Com quem compartilhamos seus dados</h2>
              <p className="mb-4">Compartilhamos apenas o necessário para prestação do serviço, segurança, cumprimento de obrigações e atividades legítimas do Instituto Mecura.</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-white mb-3">6.1 Operadores e prestadores de serviço</h3>
                  <p className="mb-2">Utilizamos parceiros para:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Atendimento ao paciente e suporte</li>
                    <li>Processamento de pagamentos</li>
                    <li>Emissão de receitas médicas digitais</li>
                    <li>Infraestrutura segura de hospedagem e processamento de dados</li>
                  </ul>
                  <p className="mt-3">Esses prestadores atuam sob contrato, seguem padrões rígidos de segurança e só tratam dados de acordo com as finalidades determinadas pelo Instituto Mecura.</p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">6.2 Terceiros relacionados ao tratamento médico</h3>
                  <p className="mb-2">Quando há prescrição, a Plataforma pode mostrar opções de contato com empresas autorizadas pela Anvisa para continuidade do tratamento.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>A relação comercial é sempre entre paciente e terceiro, nunca entre paciente e Instituto Mecura.</li>
                    <li>O Instituto Mecura não vende, não intermedeia comercialmente e não armazena estoques de produtos médicos ou similares.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-3">6.3 Autoridades e política de não comercialização</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Podemos compartilhar dados com autoridades públicas ou judiciais quando exigido por lei.</li>
                    <li>Nunca vendemos, alugamos ou cedemos dados pessoais a terceiros para fins exclusivos de publicidade.</li>
                    <li>Dados de saúde não são compartilhados para segmentação publicitária.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">7. Transferência internacional de dados</h2>
              <ul className="space-y-4 list-none">
                <li><strong className="text-white">7.1</strong> Devido às ferramentas utilizadas (como provedores de nuvem), seus dados podem ser processados em servidores localizados fora do Brasil.</li>
                <li><strong className="text-white">7.2</strong> Todas as transferências internacionais seguem a LGPD e utilizam mecanismos de segurança reconhecidos, criptografia e controles de acesso.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">8. Armazenamento e Retenção</h2>
              <ul className="space-y-4 list-none">
                <li><strong className="text-white">8.1</strong> Mantemos os dados enquanto durar a relação com o paciente, pelo período necessário para cumprir obrigações legais e regulatórias, e pelo prazo de prescrição de eventuais direitos.</li>
                <li><strong className="text-white">8.2</strong> Após o término dos prazos necessários, os dados são excluídos, anonimizados ou armazenados de forma restrita.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">9. Direitos do titular</h2>
              <p className="mb-4">Você pode, a qualquer momento e mediante solicitação, exercer os direitos previstos na LGPD, incluindo:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Acessar seus dados pessoais tratados pelo Instituto Mecura.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar a exclusão de dados, quando aplicável.</li>
                <li>Solicitar portabilidade para outro fornecedor de serviço ou produto.</li>
                <li>Revogar consentimentos previamente fornecidos.</li>
                <li>Solicitar informações sobre uso compartilhado de dados.</li>
              </ul>
              <p>As solicitações podem ser feitas pelo e-mail <strong>contato@institutomecura.com.br</strong>.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">10. Segurança da Informação</h2>
              <ul className="space-y-4 list-none">
                <li><strong className="text-white">10.1</strong> Utilizamos medidas técnicas, administrativas e organizacionais para proteger os dados pessoais contra acessos não autorizados.</li>
                <li><strong className="text-white">10.2</strong> Adotamos criptografia de dados, controles de acesso baseados em perfil, monitoramento de segurança e backups seguros.</li>
                <li><strong className="text-white">10.3</strong> Nenhum colaborador tem acesso a dados de saúde sem necessidade específica vinculada às suas funções.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">11. Crianças e adolescentes</h2>
              <ul className="space-y-4 list-none">
                <li><strong className="text-white">11.1</strong> Salvo indicação em contrário, a Plataforma é destinada a pessoas com 18 anos ou mais.</li>
                <li><strong className="text-white">11.2</strong> Caso sejam tratados dados de crianças ou adolescentes, isso será feito em conformidade com a legislação aplicável, com o consentimento específico de pelo menos um dos pais ou responsável legal.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">12. Cookies e tecnologias similares</h2>
              <p className="mb-4">Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência. Categorias de cookies:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Essenciais:</strong> necessários para funcionamento do site.</li>
                <li><strong>Analíticos:</strong> ajudam a entender como a Plataforma é utilizada.</li>
                <li><strong>Funcionais:</strong> armazenam preferências do usuário.</li>
              </ul>
              <p>Você pode desativar cookies nas configurações do navegador ou do dispositivo.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">13. Atualizações desta Política</h2>
              <p>Podemos atualizar esta Política de Privacidade a qualquer momento. A versão atualizada estará sempre disponível no site, indicando a data da última atualização. Recomendamos que você revise a Política periodicamente.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6">14. Contato</h2>
              <p className="mb-4">Em caso de dúvidas ou solicitações relacionadas aos seus dados pessoais, entre em contato pelos seguintes canais:</p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <p className="mb-2"><strong className="text-white">E-mail:</strong> contato@institutomecura.com.br</p>
                <p><strong className="text-white">Endereço:</strong> [Endereço do Instituto Mecura]</p>
              </div>
              <p className="mt-6">O Instituto Mecura se compromete a analisar as solicitações relacionadas a privacidade e proteção de dados e a responder em prazo razoável, em conformidade com a legislação aplicável.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
