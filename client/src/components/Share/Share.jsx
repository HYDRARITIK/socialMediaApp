import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import './share.scss';


const Share = ({ title, url }) => {
  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${title} - ${url}`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out this post: ${title}`);
    const body = encodeURIComponent(`Hey, I thought you might find this post interesting:\n${url}`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
  };

  // Add more share methods as needed

  return (
    <div className='sharedIcon'>
     <button onClick={shareViaWhatsApp}><WhatsAppIcon /></button>
      <button onClick={shareViaEmail}><MailIcon  /></button>
      {/* <WhatsAppIcon />
      <MailIcon  /> */}

      {/* Add more share buttons for other platforms */}
    </div>
  );
};

export default Share;
