import React, { useState } from 'react';
import boxbox from '../../../assets/box-box.png'; // Assuming the path to your image
import Navbutton from '../../../Navbutton/NavButton';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Teamreports = ({handleGoBack}) => {
    const [hasData, setHasData] = useState(false); // mock state, set this to true if you have data.
        const { t } = useTranslation(); // Initialize the translation hook

    if (!hasData) {
        return (
            <div className="no-data-container">
                <Navbutton pageName={t('teamReport.ReportName')} showBackButton={true} onBackClick={handleGoBack}/> {/* Pass it here */}
                <img src={boxbox} alt="No data" className="no-data-background" />
                <p className="no-data-message">  {t('teamReport.ReportNot')}</p>
            </div>
        );
    }

    // Return your actual component content here when data is available.
    return (
        <div>
            {/* Your actual Teamreports content here */}
        </div>
     );
}
 
export default Teamreports;
