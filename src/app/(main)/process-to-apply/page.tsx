import Link from "next/link";
import React from "react";

export default function ProcessToApplyPage() {
  return (
    <main id="main" className="main">
      <section className="hero hero--landingpage">
        <div className="hero__content">
          <div className="hero__content-breadcrumbs">
            <div className="container">
              <nav className="breadcrumbs breadcrumbs--landingpage" aria-label="Breadcrumbs">
                <ol className="breadcrumbs__list">
                  <li className="breadcrumbs__list-item breadcrumbs__list-item--home">
                    <Link href="/" className="breadcrumbs__item-link"> Home </Link>
                    <span aria-hidden="true" className="breadcrumbs__item-separator breadcrumbs__item-separator--home-ellipsis"> ... </span>
                    <span aria-hidden="true" className="breadcrumbs__item-separator">
                      <svg aria-hidden="true" focusable="false" viewBox="0 0 12 9" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                      </svg>
                    </span>
                  </li>
                  <li className="breadcrumbs__list-item breadcrumbs__list-item--current" aria-current="page"> Process to apply </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="container hero__container-flex">
            <div className="hero__text-wrapper">
              <h1 className="hero__title" tabIndex={-1}>
                <span className="hero__title-main"> Process to apply </span>
              </h1>
              <p className="hero__summary">Learn about the visa application process and the evidence and documents you may need to provide. Find out how to check the status of your visa or NZeTA and how to bring family to New Zealand once you have a visa. </p>
            </div>
            <div className="hero__links-wrapper">
              <p className="hero__links-header">Popular pages</p>
              <div>
                <ul className="hero__links-list">
                  <li className="hero__links-item">
                    <Link href="#" className="btn btn--small btn--secondary"> Processing times </Link>
                  </li>
                  <li className="hero__links-item">
                    <Link href="#" className="btn btn--small btn--secondary"> Change personal information </Link>
                  </li>
                  <li className="hero__links-item">
                    <Link href="#" className="btn btn--small btn--secondary"> Information for immigration professionals </Link>
                  </li>
                  <li className="hero__links-item">
                    <Link href="#" className="btn btn--small btn--secondary"> How to apply for a visa online </Link>
                  </li>
                  <li className="hero__links-item">
                    <Link href="#" className="btn btn--small btn--secondary"> Evidence and documents </Link>
                  </li>
                  <li className="hero__links-item">
                    <Link href="#" className="btn btn--small btn--secondary"> Check status and application timeframes </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <span className="hero__pattern"></span>
      </section>
      <div className="landing-page__elemental">
        <section className="block bg childpagetileblock">
          <div className="container block__container" id="e5118">
            <div className="tile-block">
              <div className="tile-block__list-wrapper">
                <ul className="tile-block__list tile-block__list--full">
                  <li className="tile-block__list-item">
                    <Link href="#" className="tile" data-not-external-icon="">
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">Find and choose a </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">visa</span>
                              <span className="tile__arrow">
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text"> Use our find a visa tool or visa search to find and compare visas. </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link href="#" className="tile" data-not-external-icon="">
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">Applying for a </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">visa</span>
                              <span className="tile__arrow">
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text"> Learn about choosing a visa to apply for and how to make your application. Find out about the evidence you might need to provide with your application, how to prevent delays and how to sponsor someone&apos;s visa application. </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link href="#" className="tile" data-not-external-icon="">
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">Waiting for a </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">visa</span>
                              <span className="tile__arrow">
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text"> Find out how to check the status of your visa or NZeTA online and how long it normally takes us to process the type of visa you have applied for. </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link href="#" className="tile" data-not-external-icon="">
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">If your visa is </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">declined</span>
                              <span className="tile__arrow">
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text"> Find out what you can do if your application for a temporary or residence visa is declined. </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link href="#" className="tile" data-not-external-icon="">
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">Once you have a </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">visa</span>
                              <span className="tile__arrow">
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text"> Learn what to do if your situation changes, once you have your visa, how to transfer a visa to a new passport and how to bring family. </p>
                      </div>
                    </Link>
                  </li>
                  <li className="tile-block__list-item">
                    <Link href="#" className="tile" data-not-external-icon="">
                      <div className="tile__content">
                        <div className="tile__title-wrapper">
                          <h2 className="tile__title">
                            <span className="tile__first-words">Information for immigration </span>
                            <span className="tile__title-icon-wrapper">
                              <span className="tile__last-word">professionals</span>
                              <span className="tile__arrow">
                                <svg aria-hidden="true" focusable="false" viewBox="0 0 23 17" xmlns="http://www.w3.org/2000/svg">
                                  <path d="m14.635 16.255 7.944-7.15a.812.812 0 0 0 .278-.605.813.813 0 0 0-.278-.605L14.635.748A.99.99 0 0 0 13.97.5c-.245 0-.49.085-.676.252a.793.793 0 0 0-.005 1.206l6.322 5.685H.952C.427 7.643 0 8.027 0 8.5s.427.857.952.857h18.66l-6.324 5.686a.793.793 0 0 0 .007 1.204c.188.169.434.253.677.253.242 0 .48-.082.663-.245Z"></path>
                                </svg>
                              </span>
                            </span>
                          </h2>
                        </div>
                        <p className="tile__text"> Only people who are licensed or exempt from licensing can give immigration advice. </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

