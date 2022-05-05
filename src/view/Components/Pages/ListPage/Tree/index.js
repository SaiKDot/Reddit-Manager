import React, { useState } from "react";
import styled from "styled-components";
import Archive_Folder from '../../../../Images/side/archive_folder.svg'
import Document_Folder from '../../../../Images/side/documents_folder.svg'
import Folder_Icon from '../../../../Images/side/folder.svg'
import Music_Folder from '../../../../Images/side/music_folder.svg'
import Code_Folder from '../../../../Images/side/code_folder.svg'
import Video_Folder from '../../../../Images/side/video_folder.svg'
import Downloads_Folder from '../../../../Images/side/downloads_folder.svg'
import Image_Folder from '../../../../Images/side/image_folder.svg'
const FILE_ICONS = {
  compressed: <Archive_Folder />,
  document: <Document_Folder />,
  image: <Image_Folder/>,
  folder: <Folder_Icon />,
  music: <Music_Folder />,
  video: <Video_Folder />,   
  program : <Code_Folder/>,
  downloads: <Downloads_Folder/>
}

const StyledTree = styled.div`
  line-height: 1.5;
  
  display: flex;
   
  flex-direction: column;
  
  span {
    margin-left: 5px;
  }
  svg {
    display: block;
    max-width: 20px;
    min-width: 20px;
    max-height: 20px;
    min-height: 20px;
  }
`
const StyledFile = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`
const StyledFolder = styled.div`
  padding-left: 5px;
  cursor: pointer;
  .folder--label {
    display: flex;
    align-items: center;
    user-select: none;
    span {
      margin-left: 5px;
      white-space: nowrap;
    }
    svg {
      display: block;
      max-width: 18px;
      min-width: 18px;
      max-height: 18px;
      min-height: 18px;
    }
  }
`
const Collapsible = styled.div`
  max-height: ${(p) => (p.isOpen ? '700px' : '0')};
  overflow: hidden;
  border-left: 1px dashed black;
  transition: max-height 0.25s ease-in;
`
const Bar = styled.div`
  height: 50%;
  border-top: 1px dashed black;

`

const File = ({ name }) => {
  let ext = name.split(".")[1];

  return (
    <StyledFile>
      {/* render the extension or fallback to generic file icon  */}
      {FILE_ICONS[sec] || <Folder_Icon />}
      <span>{name}</span>
    </StyledFile>
  )
};

const Folder = ({  name, icon,children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = e => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <StyledFolder>
      <div className="folder--label" onClick={handleToggle}>
        <Bar/>
        {FILE_ICONS[icon] || <Folder_Icon />}
        <span>{name}</span>
      </div>
      <Collapsible isOpen={isOpen}>{children}</Collapsible>
    </StyledFolder>
  )
};

const TreeRecursive = ({ data }) => {
  // loop through the data
  return data.map(item => {
    
    if (item.type === "file") {
      return <File name={item.name} />;
    }
   
    
      return (
        <Folder name={item.name} icon={item.icon} key={item.id}>
          
         {item.children ? <TreeRecursive data={item.children} /> : ''}
        </Folder>
      );
    
  });
};
const Tree = ({ data, children }) => {
  const isImparative = data && !children;

  return (
    <StyledTree>
      {isImparative ? <TreeRecursive data={data} /> : children}
    </StyledTree>
  );
};

Tree.File = File;
Tree.Folder = Folder;



 export default Tree