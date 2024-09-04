import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { translate } from '@docusaurus/Translate';

const FeatureList = [
  {
    title: 'قابلیت‌های کاربردی',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        قابلیت‌های کاربردی مرزبان هر کاربری را تشویق می‌کند تا از مرزبان استفاده کند و ما سعی می‌کنیم با قرار دادن نکات لازم فرایند یادگیری را برای شما لذت‌بخش و ساده‌تر کنیم.
      </>
    ),
  },
  {
    title: 'پروژه‌های جانبی',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        پروژه‌های مختلفی در گیت‌هاب به صورت جانبی برای مرزبان بوجود آمده‌اند که سعی می‌کنیم به کاربرد هر یک بپردازیم و توضیحات لازم را برای شما عزیزان فراهم کنیم.
      </>
    ),
  },
  {
    title: 'کامیونیتی بسیار فعال',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        کامیونیتی پویا و فعال از جمله ویژگی‌های منحصر به فرد مرزبان است که آن را مدیون شما عزیزان هستیم، اگر احساس می‌کنین در هر بخشی می‌توانید به مرزبان کمک کنید لطفا دریغ نکنید. 
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
