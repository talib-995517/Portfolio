


import React from 'react';
import { useParams } from 'react-router-dom';
import { mockData as originalMockData } from '../data/mockData'; 


import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';

const PreviewPage = () => {
  const { id } = useParams(); 

  
  let modifiedMockData = JSON.parse(JSON.stringify(originalMockData)); 

  
  if (id === '1') {
    
    modifiedMockData.hero.profileImage = "/template1.png"; 
    
    if (modifiedMockData.projects && modifiedMockData.projects[0]) {
      modifiedMockData.projects[0].image = "/template1.png"; 
    }
  } else if (id === '2') {
    
    modifiedMockData.hero.profileImage = "/template2.png";
    
     if (modifiedMockData.projects && modifiedMockData.projects[0]) {
      modifiedMockData.projects[0].image = "/template2.png";
    }
  }
  

  
  switch (String(id)) {
    case '1':
      return <Template1 data={modifiedMockData} />; 
      
    case '2':
      return <Template2 data={modifiedMockData} />; 
      
    default:
      return <div className="text-center p-10">Preview not found.</div>;
  }
};

export default PreviewPage;
