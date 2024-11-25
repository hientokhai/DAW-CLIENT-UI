import React from 'react';
import { Helmet } from 'react-helmet';
function ContactPage() {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Liên hệ với chúng tôi</h2>
            <p>Hãy để lại thông tin và chúng tôi sẽ liên lạc lại sớm nhất!</p>
            <form>
                <input
                    type="text"
                    placeholder="Tên của bạn"
                    style={{ padding: '8px', margin: '5px', width: '80%' }}
                    required
                />
                <input
                    type="email"
                    placeholder="Email của bạn"
                    style={{ padding: '8px', margin: '5px', width: '80%' }}
                    required
                />
                <button type="submit" style={{ padding: '8px 16px', marginTop: '10px' }}>
                    Gửi
                </button>
            </form>
        </div>
    );
}

export default ContactPage;
