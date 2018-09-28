import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div className="Footer">
            <form name="contact" netlify>
                <p>
                    <label>Name <input type="text" name="name" /></label>
                </p>
                <p>
                    <label>Email <input type="email" name="email" /></label>
                </p>
                <p>
                    <button type="submit">Send</button>
                </p>
            </form>
        </div>
    );
}

export default Footer;