import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Step = {
  ordinal: string;
  title: string;
  href: string;
  description: ReactNode;
};

const STEPS: Step[] = [
  {
    ordinal: '0',
    title: 'Context',
    href: '/docs/context/',
    description: (
      <>
        Engagement onboarding, client background, way-of-working, and the
        storyline that frames everything.
      </>
    ),
  },
  {
    ordinal: '1',
    title: 'Research',
    href: '/docs/research/',
    description: (
      <>
        Data gathered into the engagement — markdown notes, CSVs, screenshots,
        and diagrams the team and the code can both read.
      </>
    ),
  },
  {
    ordinal: '2',
    title: 'Synthesis',
    href: '/docs/synthesis/',
    description: (
      <>
        Hypotheses, MECE breakdowns, and the storyline being shaped from the
        research toward a presentable point of view.
      </>
    ),
  },
];

function StepCard({ordinal, title, href, description}: Step) {
  return (
    <Link to={href} className={clsx('col col--4', styles.cardLink)}>
      <article className={styles.card}>
        <span className={styles.ordinal}>{ordinal}</span>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardBody}>{description}</p>
        <span className={styles.cardCta}>Open {title.toLowerCase()} →</span>
      </article>
    </Link>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <p className={styles.sectionEyebrow}>How an engagement is structured</p>
        <Heading as="h2" className={styles.sectionTitle}>
          Three iterative steps, one repository
        </Heading>
        <p className={styles.sectionLead}>
          Research output flows into synthesis. Synthesis output flows into the
          presentation you are reading right now. Every claim links back to the
          underlying data.
        </p>
        <div className="row">
          {STEPS.map((step) => (
            <StepCard key={step.ordinal} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
