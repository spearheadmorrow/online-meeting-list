import React from 'react';
import { Text, Stack } from '@chakra-ui/core';

export function Textual() {
  return (
    <Stack>
        <Text>All meeting times are in your timezone.</Text>
        <Text><a href="https://docs.google.com/spreadsheets/d/1mJsAtK9GYq2TJwFSKbkq9OD436s00E_pTx1Oj96HbjI/edit#gid=0">YPAA share recordings</a>.</Text>
        <Text><a href="https://photos.google.com/share/AF1QipP6wBEm-jbNvmQ6q5XlG4yLPLlgarfcOKV11_ucuvUuWzzgfyXfNuYXRGHKb0BVog?key=VC1mLTRwX0lBX3NPVG5hSnBDcmgtT2h4WFd6WGFB">YPAA Events and Conventions</a>.</Text>
    </Stack>
  );
}
