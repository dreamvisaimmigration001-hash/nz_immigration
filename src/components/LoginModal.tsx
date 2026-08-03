"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  const [firstSelection, setFirstSelection] = useState("");
  const [secondSelection, setSecondSelection] = useState("");

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} id="modal-login" className="modal__wrapper modal--full splash-login">
      <div className="modal__container">
        <div className="modal__header">
            <Link href="/" className="modal__logo" title="Immigration NZ">
                <svg className="header__logo-desktop" aria-label="Immigration New Zealand logo" width="200" height="64" viewBox="0 0 200 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#fff" clipPath="url(#a)"><path d="M11.048 47.597c.128-.157 2.79 10.759 17.607 8.895-2.904-7.11-11.958-11.766-14.055-11.897.398-.314 3.008-2.29 3.43-2.531-.564 1.923 7.939 9.954 14.511 7.73-1.75-5.441-8.97-10.039-10.836-10.11.782-.406 1.564-1.04 2.379-1.433-.43 1.033 5.822 7.253 12.503 6.756.064-3.224-7.169-9.385-8.566-8.895.666-.36 1.686-.968 1.994-1.125.949 2.224 7.117 6.972 11.362 6.194-3.475-7.476-7.9-7.92-7.938-7.927 1.173-.569 1.872-.929 2.084-1.027.012 2.008 6.085 6.534 10.323 5.475-.86-3.33-4.2-6.573-7.476-6.88l2.237-1.08c-.346.628 4.79 4.984 9.65 4.709-2.346-5.795-5.565-5.919-6.72-6.141.655-.301 1.367-.7 2.053-1.066.275.739 2.923 4.565 9.33 3.597-1.617-3.532-4.996-4.71-6.772-4.834.91-.549 1.59-.778 2.25-1.157.456.536 2.052 3.983 8.554 2.727-1.378-3.348-4.36-4.146-5.527-4.375.552-.34 1.2-.7 1.635-.962.436.766 3.745 3.179 7.316 2.172-.686-2.021-3.218-3.231-5.488-3.31a40.698 40.698 0 0 0 1.898-1.327c.327.785 2.27 2.668 6.784 1.406-1.45-2.884-5.156-2.531-5.194-2.512.891-.673 1.148-.909 1.846-1.458.07.033 2.161 3.002 5.816.935-1.103-1.707-2.725-2.616-4.405-2.165.494-.497.917-.857 1.327-1.327-.16.431 2.719 1.975 5.252-.027-1.212-1.196-2.54-1.497-3.982-1.406.288-.425.372-.392.757-.909 0 0 2.263 1.72 4.405-.418-1.745-1.322-3.764-.478-3.77-.478l.826-1.295c.366.49 2.809.962 3.662-.7-.706-.693-2.898-.457-3.13-.294.071-.065.27-.543.398-.798 4.52.563 2.975-4.794 1.956-7.809-17.037 26.384-39.697 7.718-67.41 24.304-1.295 3.427-1.763 7.004-1.423 10.732.038.367.032.654.18 1.485-.052.255.307 2.296 1.044 4.565.545 1.615 1.161 2.701 1.84 4.369.405-.307.866-.66 1.18-.942-1.237-1.792-5.405-12.655-.23-18.993 4.911-.085 5.47 14.212 4.648 15.73.032 0 2.283-1.544 3.155-2.093-1.051-.425-4.77-12.852 1.436-18.012 0 0 5.534 2.158 3.232 15.265.943-.628 2.264-1.197 3.565-1.877-.705-1.25-4.488-10.635 1.565-15.533 3.257 1.36 3.09 11.615 1.814 13.852 1.046-.497 2.168-1.092 3.213-1.576-1.911-.896-1.764-10.543 1.455-13.172 3.585 3.433 2.713 9.202 1.815 11.726 0 0 2.712-1.144 2.693-1.138-2.135-4.1-1.141-9.064 1.141-11.02 1.75 1.145 2.232 4.447 1.43 9.921.763-.313 1.2-.542 1.95-.824-.469-.902-1.7-6.488 1.455-9.496 2.821 1.367 1.821 7.58 1.61 8.215.025-.046 1.654-.654 1.628-.707-.551-1.21-.943-5.808 1.66-8.025 1.033.752 2.123 2.845 1.142 6.809.603-.301 1.257-.563 1.872-.85-.878-1.001-.243-5.037 1.084-6.652 1.59.713 2.27 4.205 1.7 5.363.397-.203.91-.458 1.557-.83-.506-.818-.673-4.579.885-5.606 1.526 1.066 1.372 3.82 1.315 4.435.436-.288 1.712-.955 1.686-.975-.84-.765-1.244-3.29.564-4.813 1.571.353 1.603 3.348 1.469 3.544a49.183 49.183 0 0 0 2.084-1.497c-1.443-.32-1.276-2.682-.494-3.728.955.202 1.628.791 1.943 2.53.372-.346 1.25-1.072 1.52-1.392-.873-.072-1.963-2.002-.616-3.27.404.17 1.648.706 1.77 2.073.179-.13.833-.975.942-1.125-.596-.222-1.27-2.073-.648-2.884.828-.079 1.559 1.06 1.674 1.537l.808-1.197c-.462-.386-1.424-1.498-.577-2.472.93.045 1.263.765 1.462 1.438-9.388 18.738-47.283 21.95-67.057 44.48 0 0-2.059 2.192-2.059 3.238v7.607h.398c1-2.858 4.2-10.131 10.638-15.442M83.1-.003c-2.225.052-3.995 1.949-3.943 4.212.05 2.263 1.91 4.068 4.142 4.009 2.231-.052 4-1.942 3.943-4.212-.058-2.27-1.917-4.068-4.148-4.01h.006Zm3.668 4.022c.044 1.995-1.514 3.67-3.476 3.715-1.968.046-3.603-1.543-3.654-3.532-.052-2.001 1.506-3.669 3.475-3.715 1.962-.045 3.603 1.537 3.655 3.532Z"></path><path d="M82.69 3.274v-.491h-2.123v.49h.789v2.525h.526V3.274h.808Zm2.95 2.524V2.783h-.546l-.872 1.714-.865-1.714h-.533v3.015h.532V3.83l.629 1.263h.487l.622-1.263V5.8h.545Zm108.414 34.644h-5.098V26.066h5.098c1.564 0 2.847.478 3.738 1.38 1.449 1.485 1.443 3.297 1.43 5.213v1.073c0 1.981.025 3.845-1.43 5.33-.891.903-2.18 1.38-3.738 1.38Zm-2.251-2.603h2.001c.885 0 1.519-.268 1.994-.857.5-.621.577-1.622.577-3.787s-.083-3.047-.577-3.662c-.481-.589-1.109-.857-1.994-.857h-2.001v9.163Zm-56.124 2.603h-9.323v-9.62c0-.962-.013-2.878.436-3.604.487-.766 1.109-1.152 2.327-1.152h6.566v2.603h-5.072c-.353 0-.737.079-1.026.367-.282.287-.378.863-.378 1.242v1.603h5.514v2.61h-5.514v3.335h6.476v2.603l-.006.013ZM91.263 26.066h-9.324v9.628c0 .961-.019 2.877.43 3.597.487.772 1.11 1.15 2.328 1.15h6.572V37.84h-5.072c-.36 0-.744-.079-1.026-.36-.282-.294-.372-.87-.372-1.249v-1.602h5.514v-2.603H84.8v-3.342h6.476v-2.604l-.013-.013Zm69.063 11.773v2.603h-9.188V27.924c.013-.91-.263-1.328-.917-1.727l-.032-.013s-.019-.033-.019-.052c0-.04.025-.066.058-.066h1.673c1.116 0 2.02.354 2.084 3.1v8.673h6.341Zm-81.298 2.603h-2.526l-5.437-8.594v8.594h-2.847V26.066h2.52l5.437 8.581v-8.58h2.853v14.375Zm104.145-7.933v-4.86c-.052-.745-.231-1.144-.815-1.445l-.032-.013s-.019-.033-.019-.053c0-.039.026-.065.058-.065h1.641c1.321-.052 1.988.955 2.013 3.008V40.45h-2.526l-5.437-8.594v8.594h-2.847V26.073h2.526l5.431 8.58v-2.138l.007-.006Zm-14.056-5.036c-.314-.942-.878-1.413-1.686-1.407h-1.045l-5.123 14.376h2.981l.84-2.518h4.873l.827 2.518h2.982l-4.642-12.97h-.007Zm-3.231 7.979 1.68-4.932 1.622 4.932h-3.302Zm-20.859-7.98c-.314-.941-.878-1.412-1.686-1.406h-1.045l-5.13 14.376h2.975l.847-2.518h4.873l.827 2.518h2.975l-4.636-12.97Zm-3.231 7.98 1.686-4.932 1.622 4.932h-3.308Zm-43.525-.576 2.501-8.81h2.135l2.5 8.81 2.136-8.81h2.975l-3.783 14.376h-2.366l-2.527-8.49-2.526 8.49h-2.372l-3.232-12.329c-.308-1.203-.66-1.595-1.456-1.916l-.032-.013s-.025-.033-.025-.052c0-.04.025-.072.057-.072h1.885c1.353.013 2.155.674 2.456 1.988l1.661 6.822.013.006Zm24.994-5.036c.532-.942.898-2.093.93-2.989v-.785h-9.054v2.603h5.655l-5.912 9.451v2.322h9.311v-2.603h-5.938l5.002-7.999h.006ZM129.35 46.224c-.257-.766-.712-1.145-1.372-1.145h-.853l-4.168 11.694h2.424l.686-2.054h3.969l.667 2.054h2.424l-3.777-10.55Zm-2.629 6.494 1.366-4.01 1.321 4.01h-2.687Zm-19.538 3.996c-1.205 0-2.231-.425-3.058-1.269-1.116-1.138-1.116-2.524-1.116-4.44v-.315c0-1.916 0-3.296 1.116-4.44.834-.85 1.866-1.27 3.058-1.27 1.494 0 2.399.387 3.469 1.479l.039.033-1.552 1.582-.032-.039c-.641-.654-1.09-.961-1.917-.961-.552 0-1.039.209-1.366.588-.404.458-.526.93-.526 3.179 0 2.25.129 2.74.526 3.192.321.372.802.575 1.366.575.603 0 1.077-.203 1.462-.628.391-.438.474-1.066.474-1.524v-.353h-1.981v-1.962h4.27v1.688c0 1.74-.295 2.733-1.051 3.538-.834.883-1.898 1.334-3.168 1.334l-.013.013Zm-23.352.052H81.51V50.18l-2.09 4.232H77.86l-2.11-4.238v6.592h-2.314V45.08H75.7l2.944 6.2 2.917-6.2h2.27v11.687Zm12.67 0h-2.315V50.18l-2.09 4.232h-1.565l-2.103-4.238v6.592h-2.32V45.08h2.269l2.937 6.2 2.917-6.2h2.27v11.687Zm54.958-.052c-1.251 0-2.27-.419-3.117-1.288-1.135-1.158-1.135-2.558-1.135-4.5v-.314c0-1.942 0-3.342 1.135-4.5.847-.863 1.866-1.282 3.117-1.282 1.25 0 2.25.419 3.097 1.282 1.147 1.171 1.147 2.603 1.147 4.578v.157c0 1.976 0 3.408-1.147 4.579-.847.863-1.86 1.288-3.097 1.288Zm0-9.764c-.565 0-1.071.215-1.398.601-.411.465-.532.948-.532 3.224 0 2.277.121 2.754.532 3.218.327.386.833.602 1.398.602.564 0 1.051-.216 1.385-.602.416-.47.545-.98.545-3.224 0-2.243-.129-2.753-.545-3.224-.334-.386-.821-.602-1.385-.602v.007Zm-13.793 9.816h-2.321v-9.568h-2.969v-2.119h8.259v2.119h-2.969v9.568Zm28.81 0h-2.059l-4.424-6.985v6.985h-2.315V45.08h2.052l4.424 6.978V45.08h2.322v11.687ZM98.643 48.14v-1.557c.013-.739-.212-1.079-.75-1.4l-.026-.013s-.013-.026-.013-.039c0-.032.02-.052.051-.052h1.36c.91 0 1.654.314 1.699 2.55v9.144h-2.321V48.14Zm-29.508 0v-1.557c.012-.739-.212-1.079-.75-1.4l-.026-.013s-.013-.026-.013-.039c0-.032.02-.052.051-.052h1.36c.916 0 1.654.314 1.699 2.55v9.144h-2.322V48.14Zm73.584 0v-1.557c.013-.739-.212-1.079-.75-1.4l-.026-.013s-.013-.026-.013-.039c0-.032.02-.052.045-.052h1.36c.91 0 1.654.314 1.699 2.55v9.144h-2.321V48.14h.006Zm-20.647 8.626h-2.68l-2.219-4.623h-1.513v4.623h-2.321V45.072h4.501c2.2 0 3.738 1.478 3.738 3.598 0 1.425-.769 2.57-2.051 3.073l2.545 5.023Zm-6.418-6.612h2.039c.936 0 1.564-.595 1.564-1.478s-.628-1.478-1.564-1.478h-2.039v2.956Z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h200v64H0z"></path></clipPath></defs></svg>
            </Link>
            <button onClick={onClose} aria-label="Close modal" style={{ background: 'transparent', border: 'none', position: 'absolute', top: '32px', right: '32px', color: '#fff', cursor: 'pointer', padding: '8px' }}>
                <span className="modal__close-icon" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </span>
            </button>
        </div>
        <div className="modal__content">
          <div className="splash-container splash--login">
            <section className="block logindecisiontreeblock">
              <div className="container block__container" id="log-into-our-online-systems">
                <div className="decisiontree">
                  <div className="block__title decisiontree-header">
                    <h2 className="decisiontree-title"> Log into our online systems </h2>
                  </div>
                  <div className="block__content decisiontree-main">
                    <div className="step--dropdown">
                      <div className="step step--first">
                        <form action="/study/getNextStepDataForAnswer/" method="POST" className="step-form">
                          <label className="step-title" htmlFor="step-input-388" id="step-title-388">What would you like to do?</label>
                          <div dir="auto" className={`v-select vs--single vs--searchable ${isFirstOpen ? 'vs--open' : ''}`}>
                            <div id="vs1__combobox" className="vs__dropdown-toggle" role="combobox" aria-expanded={isFirstOpen} aria-owns="vs1__listbox"
                        aria-controls="vs1__listbox" aria-label="Search for option" onClick={() => setIsFirstOpen(!isFirstOpen)}>
                              <div className="vs__selected-options">
                                <div className="vs__input-box">
                                  <input className="vs__search" placeholder="Select option" id="step-input-388" aria-autocomplete="list" aria-labelledby="vs1__combobox" aria-controls="vs1__listbox" type="search" autoComplete="off" aria-expanded={isFirstOpen} role="combobox" value={firstSelection || ""} readOnly />
                                </div>
                              </div>
                              <div className="vs__actions">
                                <span role="presentation" className="vs__open-indicator">
                                  <svg aria-hidden="true" focusable="false" width="12" height="9" viewBox="0 0 12 9" xmlns="http://www.w3.org/2000/svg" aria-label="Open dropdown" style={{ transform: isFirstOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s cubic-bezier(1, -0.115, 0.975, 0.855)' }}>
                                    <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                            {isFirstOpen && (
                                <ul id="vs1__listbox" role="listbox" className="vs__dropdown-menu" style={{ display: 'block', position: 'absolute', width: '100%', zIndex: 1000, background: '#fff', border: '1px solid #ccc', marginTop: '4px', padding: 0, listStyle: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                    <li role="option" aria-selected={firstSelection === "Start, edit or check the status of an application"} className={`vs__dropdown-option ${firstSelection === "Start, edit or check the status of an application" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: firstSelection === "Start, edit or check the status of an application" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setFirstSelection("Start, edit or check the status of an application"); setSecondSelection(""); setIsFirstOpen(false); }}>Start, edit or check the status of an application</li>
                                    <li role="option" aria-selected={firstSelection === "Verify the details of current New Zealand visa holders"} className={`vs__dropdown-option ${firstSelection === "Verify the details of current New Zealand visa holders" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: firstSelection === "Verify the details of current New Zealand visa holders" ? '#f5f5f5' : '#fff' }} onClick={() => { setFirstSelection("Verify the details of current New Zealand visa holders"); setSecondSelection(""); setIsFirstOpen(false); }}>Verify the details of current New Zealand visa holders</li>
                                </ul>
                            )}
                          </div>

                          {firstSelection && (
                              <>
                                  <label className="step-title" htmlFor="step-input-389" id="step-title-389" style={{ marginTop: '20px' }}>
                                      {firstSelection === "Start, edit or check the status of an application" ? "Choose a visa or application type" : "Verify the details of current New Zealand visa holders"}
                                  </label>
                                  <div dir="auto" className={`v-select vs--single vs--searchable ${isSecondOpen ? 'vs--open' : ''}`}>
                                    <div id="vs2__combobox" className="vs__dropdown-toggle" role="combobox" aria-expanded={isSecondOpen} aria-owns="vs2__listbox"
                        aria-controls="vs2__listbox" aria-label="Search for option" onClick={() => setIsSecondOpen(!isSecondOpen)}>
                                      <div className="vs__selected-options">
                                        <div className="vs__input-box">
                                          <input className="vs__search" placeholder="Select option" id="step-input-389" aria-autocomplete="list" aria-labelledby="vs2__combobox" aria-controls="vs2__listbox" type="search" autoComplete="off" aria-expanded={isSecondOpen} role="combobox" value={secondSelection || ""} readOnly />
                                        </div>
                                      </div>
                                      <div className="vs__actions">
                                        <span role="presentation" className="vs__open-indicator">
                                          <svg aria-hidden="true" focusable="false" width="12" height="9" viewBox="0 0 12 9" xmlns="http://www.w3.org/2000/svg" aria-label="Open dropdown" style={{ transform: isSecondOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s cubic-bezier(1, -0.115, 0.975, 0.855)' }}>
                                            <path d="M9.004 5.228 6.008 8.5 3.004 5.22A412.023 412.023 0 0 1 0 1.92c0-.01.289-.333.642-.719L1.284.5l2.358 2.575a255.804 255.804 0 0 0 2.374 2.576c.01 0 1.072-1.153 2.363-2.562L10.724.527l.638.696c.35.384.638.705.638.715 0 .01-1.348 1.49-2.996 3.29Z"></path>
                                          </svg>
                                        </span>
                                      </div>
                                    </div>
                                    {isSecondOpen && (
                                        <ul id="vs2__listbox" role="listbox" className="vs__dropdown-menu" style={{ display: 'block', position: 'absolute', width: '100%', zIndex: 1000, background: '#fff', border: '1px solid #ccc', marginTop: '4px', padding: 0, listStyle: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxHeight: '300px', overflowY: 'auto' }}>
                                            {firstSelection === "Start, edit or check the status of an application" ? (
                                                <>
                                                    <li role="option" aria-selected={secondSelection === "Accredited Employer Work Visa"} className={`vs__dropdown-option ${secondSelection === "Accredited Employer Work Visa" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "Accredited Employer Work Visa" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setSecondSelection("Accredited Employer Work Visa"); setIsSecondOpen(false); }}>Accredited Employer Work Visa</li>
                                                    <li role="option" aria-selected={secondSelection === "Visitor visas"} className={`vs__dropdown-option ${secondSelection === "Visitor visas" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "Visitor visas" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setSecondSelection("Visitor visas"); setIsSecondOpen(false); }}>Visitor visas</li>
                                                    <li role="option" aria-selected={secondSelection === "Student visas"} className={`vs__dropdown-option ${secondSelection === "Student visas" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "Student visas" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setSecondSelection("Student visas"); setIsSecondOpen(false); }}>Student visas</li>
                                                    <li role="option" aria-selected={secondSelection === "Partner or child of a New Zealander visas"} className={`vs__dropdown-option ${secondSelection === "Partner or child of a New Zealander visas" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "Partner or child of a New Zealander visas" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setSecondSelection("Partner or child of a New Zealander visas"); setIsSecondOpen(false); }}>Partner or child of a New Zealander visas</li>
                                                    <li role="option" aria-selected={secondSelection === "Partner or child of a worker or student visas"} className={`vs__dropdown-option ${secondSelection === "Partner or child of a worker or student visas" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "Partner or child of a worker or student visas" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setSecondSelection("Partner or child of a worker or student visas"); setIsSecondOpen(false); }}>Partner or child of a worker or student visas</li>
                                                    <li role="option" aria-selected={secondSelection === "Parent Resident Visa – EOI"} className={`vs__dropdown-option ${secondSelection === "Parent Resident Visa – EOI" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "Parent Resident Visa – EOI" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setSecondSelection("Parent Resident Visa – EOI"); setIsSecondOpen(false); }}>Parent Resident Visa – EOI</li>
                                                    <li role="option" aria-selected={secondSelection === "Straight to Residence Visa"} className={`vs__dropdown-option ${secondSelection === "Straight to Residence Visa" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "Straight to Residence Visa" ? '#f5f5f5' : '#fff' }} onClick={() => { setSecondSelection("Straight to Residence Visa"); setIsSecondOpen(false); }}>Straight to Residence Visa</li>
                                                </>
                                            ) : (
                                                <>
                                                    <li role="option" aria-selected={secondSelection === "Visa Verification Service"} className={`vs__dropdown-option ${secondSelection === "Visa Verification Service" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "Visa Verification Service" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setSecondSelection("Visa Verification Service"); setIsSecondOpen(false); }}>Visa Verification Service</li>
                                                    <li role="option" aria-selected={secondSelection === "VisaView for employers"} className={`vs__dropdown-option ${secondSelection === "VisaView for employers" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "VisaView for employers" ? '#f5f5f5' : '#fff', borderBottom: '1px solid #eee' }} onClick={() => { setSecondSelection("VisaView for employers"); setIsSecondOpen(false); }}>VisaView for employers</li>
                                                    <li role="option" aria-selected={secondSelection === "VisaView for education providers"} className={`vs__dropdown-option ${secondSelection === "VisaView for education providers" ? 'vs__dropdown-option--selected vs__dropdown-option--highlight' : ''}`} style={{ padding: '10px', cursor: 'pointer', background: secondSelection === "VisaView for education providers" ? '#f5f5f5' : '#fff' }} onClick={() => { setSecondSelection("VisaView for education providers"); setIsSecondOpen(false); }}>VisaView for education providers</li>
                                                </>
                                            )}
                                        </ul>
                                    )}
                                  </div>
                              </>
                          )}
                          
                          {secondSelection && (
                              <div className="step-result" style={{ marginTop: '20px' }}>
                                  {secondSelection === "Accredited Employer Work Visa" && (
                                      <>
                                          <h3>Accredited Employer Work Visa (AEWV) or seasonal AEWV</h3>
                                          <p>Log in here to apply for an Accredited Employer Work Visa (AEWV) or a seasonal AEWV (Global Workforce Seasonal Visa or Peak Seasonal Visa). If you do not have an account, you can create one here.</p>
                                      </>
                                  )}
                                  {secondSelection === "Visa Verification Service" && (
                                      <>
                                          <h3>Visa Verification Service</h3>
                                          <p>If you are a current visa holder and provide your details to a third-party (such as a bank), they can use this information to verify your visa using the Visa Verification Service. Read this information before you login.</p>
                                      </>
                                  )}
                                  {secondSelection !== "Accredited Employer Work Visa" && secondSelection !== "Visa Verification Service" && (
                                      <>
                                          <h3>{secondSelection}</h3>
                                          <p>Log in to proceed with {secondSelection}.</p>
                                      </>
                                  )}
                                  
                                  <Link href="/" className="paragraph-link">What is RealMe?</Link>
                                  
                                  <div style={{ marginTop: '20px' }}>
                                      <Link href="/login" onClick={onClose} style={{ textDecoration: 'none' }}>
                                          <button type="button" className="btn btn--primary" style={{ backgroundColor: '#e24e23', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ marginRight: '8px' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                                              Log in
                                          </button>
                                      </Link>
                                  </div>
                                  <div style={{ marginTop: '20px' }}>
                                      <Link href="#" className="paragraph-link" style={{ color: '#fff', display: 'flex', alignItems: 'center' }} onClick={(e) => { e.preventDefault(); setFirstSelection(""); setSecondSelection(""); setIsFirstOpen(false); setIsSecondOpen(false); }}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '5px' }}><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                                          Start again?
                                      </Link>
                                  </div>
                              </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="splash-login__pattern"></div>
        </div>
      </div>
    </dialog>
  );
}
