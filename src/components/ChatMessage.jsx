import React, { useContext } from 'react'
import { GlobalContext } from '../contexts/Global'

const ChatMessage = ({ sender, message, time}) => {

    function styleTextWithRegex(input) {
        if (!input || typeof input !== "string") {
          return input; // Return unchanged if input is invalid
        }
      
        // Define regex patterns
        const patterns = {
          bold: /\*\*(.*?)\*\*/g, // Match text wrapped in ** (e.g., **bold**)
          italics: /__(.*?)__/g, // Match text wrapped in __ (e.g., __italics__)
          links: /\[(.*?)\]\((.*?)\)/g, // Match text in [text](url) format
        };
      
        // Apply styles
        let styledText = input;
      
        // Replace bold (**bold**) with <b>bold</b>
        styledText = styledText.replace(patterns.bold, (_, text) => `<b>${text}</b>`);
      
        // Replace italics (__italics__) with <i>italics</i>
        styledText = styledText.replace(patterns.italics, (_, text) => `<i>${text}</i>`);
      
        // Replace links [text](url) with <a href="url">text</a>
        styledText = styledText.replace(patterns.links, (_, text, url) => `<a href="${url}" target="_blank">${text}</a>`);
      
        return styledText;
      }
      
    const { currUser: user, formatDateTimeIST } = useContext(GlobalContext);

  return (
    <div className={` ${sender === user.username ? 'self-end' : 'self-start'} max-w-3/4 w-2/4 h-fit my-1 `}>
        <div className={`w-full h-fit rounded-md ${sender === user.username ? 'bg-rose-500' : 'bg-neutral-800'}  p-2 flex flex-col`}>
            <div className={`w-full h-4 text-xs ${sender === user.username ? 'text-white' : 'text-neutral-400'}`}>
                @{sender}
            </div>
            <div dangerouslySetInnerHTML={{ __html:styleTextWithRegex(message)  }} className={`w-full h-fit ${sender === user.username ? 'text-white' : 'text-neutral-400'} py-2`} />
            {
                // sender !== user.username && 
                <div className={`flex items-center justify-end ${sender === user.username ? 'text-white' : 'text-neutral-500'}  text-sm`}>
                    {formatDateTimeIST(time)}
                </div>
            }
        </div>
    </div>
  )
}

export default ChatMessage