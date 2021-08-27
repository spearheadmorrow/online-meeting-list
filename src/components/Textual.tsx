import React from 'react';
import { Text, Stack } from '@chakra-ui/core';

export function Textual() {
  return (
    <Stack>
        <Text>All meeting times are in your timezone.</Text>
        <Text>To add or update your meeting, <a href="https://docs.google.com/forms/d/1Q1nZ_zOVu4q1Qt85wTXQjZPhPuXfG2xwZHrK2-pp6Kg">fill in this form</a>.</Text>
        <Text><a href="https://docs.google.com/spreadsheets/d/1mJsAtK9GYq2TJwFSKbkq9OD436s00E_pTx1Oj96HbjI/edit#gid=0">YPAA share recordings</a>.</Text>
        <Text><a href="https://photos.google.com/share/AF1QipP6wBEm-jbNvmQ6q5XlG4yLPLlgarfcOKV11_ucuvUuWzzgfyXfNuYXRGHKb0BVog?key=VC1mLTRwX0lBX3NPVG5hSnBDcmgtT2h4WFd6WGFB">YPAA Events and Conventions</a>.</Text>
    </Stack>
  );
}
