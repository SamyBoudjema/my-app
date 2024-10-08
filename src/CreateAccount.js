import React, { useState } from 'react';
import './CreateAccount.css'; 
import * as XLSX from 'xlsx';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    digit: false,
    lowercase: false,
    uppercase: false,
    match: false
  }); 

  const emailSyntaxe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailBlur = () => {
    if (!emailSyntaxe.test(email)) {
      setEmailError("❌ L'adresse mail saisie n'est pas valide.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (pwd, repwd) => {
    const criteria = {
      length: pwd.length >= 8,
      digit: /\d/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      match: pwd === repwd
    };
    setPasswordCriteria(criteria);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value, repassword);
  };

  const handleRepasswordChange = (e) => {
    const value = e.target.value;
    setRepassword(value);
    validatePassword(password, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validatePassword(password, repassword);

    if (!passwordCriteria.match) {
      setErrorMessage("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    if (!passwordCriteria.length || !passwordCriteria.digit || !passwordCriteria.lowercase || !passwordCriteria.uppercase) {
      setErrorMessage("❌ Le mot de passe ne répond pas aux critères.");
      return;
    }

    const data = [
      { "Prénom": firstName, "Nom": lastName, "Email": email, "Mot de passe": password }
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compte");
    XLSX.writeFile(workbook, 'compte-utilisateur.xlsx');

    alert('Fichier Excel créé avec succès !');
    setErrorMessage('');
  };

  return (
    <div className="container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div>
          <label htmlFor="repassword">Confirmation du mot de passe</label>
          <input
            type="password"
            id="repassword"
            value={repassword}
            onChange={handleRepasswordChange}
            required
          />
        </div>

        {emailError && <p className="errorMessage">{emailError}</p>}

        <p className={`passwordMessage ${passwordCriteria.length ? 'valid' : 'invalid'}`}>
          {passwordCriteria.length ? '✅ Le mot de passe a la bonne longueur.' : '❌ Le mot de passe doit contenir au moins 8 caractères.'}
        </p>

        <p className={`passwordMessage ${passwordCriteria.digit ? 'valid' : 'invalid'}`}>
          {passwordCriteria.digit ? '✅ Le mot de passe contient un chiffre.' : '❌ Le mot de passe doit contenir au moins un chiffre.'}
        </p>

        <p className={`passwordMessage ${passwordCriteria.lowercase ? 'valid' : 'invalid'}`}>
          {passwordCriteria.lowercase ? '✅ Le mot de passe contient une lettre minuscule.' : '❌ Le mot de passe doit contenir au moins une lettre minuscule.'}
        </p>

        <p className={`passwordMessage ${passwordCriteria.uppercase ? 'valid' : 'invalid'}`}>
          {passwordCriteria.uppercase ? '✅ Le mot de passe contient une lettre majuscule.' : '❌ Le mot de passe doit contenir au moins une lettre majuscule.'}
        </p>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
};

export default CreateAccount;
