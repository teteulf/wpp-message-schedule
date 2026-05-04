"use client";

import { sendUazMessage } from "@/app/services/send-message";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/app/ui/input-group";

export default function SendMessagePage() {
  const [textMsg, setTextMsg] = useState("");
  const [groupId, setGroupId] = useState("120363297244604678@g.us");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border bg-background shadow-sm p-4 md:p-6">
          <InputGroup className="gap-3">
            <InputGroupTextarea
              id="block-end-textarea"
              placeholder="Escreva um comentário..."
              className="min-h-30 resize-none text-sm"
              value={textMsg}
              onChange={(e) => setTextMsg(e.target.value)}
            />

            <InputGroupAddon
              align="block-end"
              className="flex items-center justify-between gap-3"
            >
              <InputGroupText className="text-xs text-muted-foreground">
                0/280
              </InputGroupText>

              <InputGroupButton
                variant="default"
                size="sm"
                className="ml-auto rounded-xl px-4"
                onClick={() =>
                  sendUazMessage({ number: groupId, text: textMsg })
                }
              >
                Postar
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}
