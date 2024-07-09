import { useState, useRef } from "react";
import { Textarea, Button, Box, Tooltip } from "@chakra-ui/react";

function CopyableTextarea() {
  const [copySuccess, setCopySuccess] = useState(false);
  const textareaRef = useRef(null);

  const copyToClipboard = () => {
    textareaRef.current.select();
    document.execCommand("copy");
    setCopySuccess(true);
  };

  return (
    <Box position="relative" width="100%">
      <Textarea
        ref={textareaRef}
        isDisabled
        placeholder="Here is a sample placeholder"
        size="md"
        resize="vertical"
        minHeight="150px"
        borderWidth="1px"
        borderRadius="md"
        _disabled={{ backgroundColor: "white" }}
      />
      <Tooltip isOpen={copySuccess} label="Copied!" placement="top" hasArrow>
        <Button
          position="absolute"
          top="4px"
          right="4px"
          size="sm"
          onClick={copyToClipboard}
        >
          Copy
        </Button>
      </Tooltip>
    </Box>
  );
}

export default CopyableTextarea;
