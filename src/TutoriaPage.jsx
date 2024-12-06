import Section from './Section';

function TutoriaPage() {
  const sections = [
    { title: 'Seção 1', content: 'Conteúdo da Seção 1' },
    { title: 'Seção 2', content: 'Conteúdo da Seção 2' },
    { title: 'Seção 3', content: 'Conteúdo da Seção 3' },
  ];

  return (
    <div>
      <ul className="space-y-4">
        {sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            content={section.content}
          />
        ))}
      </ul>
    </div>
  );
}

export default TutoriaPage;
