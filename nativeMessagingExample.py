#!/usr/bin/env python
# idk
import struct
import sys
import threading
import queue as Queue

try:
  import tkinter as Tkinter
  # import tkMessageBox
  from tkinter import tkMessageBox

except ImportError:
  tkinter = None

# Helper function that sends a message to the webapp.
def send_message(message):
   # Write message size.,
   
  sys.stdout.write(struct.pack('I', len(message)))
  #sys.stdout.write(message)

  # Write the message itself.
  sys.stdout.write(message)
  sys.stdout.flush()

# Thread that reads messages from the webapp.
def read_thread_func(queue):
  message_number = 0
  while 1:
    # Read the message type (first 4 bytes).
    text_length_bytes = sys.stdin.read(4)

    if len(text_length_bytes) == 0:
      if queue:
        queue.put(None)
      sys.exit(0)

    # Read the message length (4 bytes).
    text_length = struct.unpack('i', text_length_bytes)[0]

    # Read the text (JSON object) of the message.
    text = sys.stdin.read(text_length).decode('utf-8')

    if queue:
      queue.put(text)
    else:
      # In headless mode just send an echo message back.
      send_message('{"echo": %s}' % text)

if Tkinter:
  class NativeMessagingWindow(Tkinter.Frame):
    def __init__(self, queue):
      self.queue = queue

      Tkinter.Frame.__init__(self)
      self.pack()

      self.text = Tkinter.Text(self)
      self.text.grid(row=0, column=0, padx=10, pady=10, columnspan=2)
      self.text.config(state=Tkinter.DISABLED, height=10, width=40)

      self.messageContent = Tkinter.StringVar()
      self.sendEntry = Tkinter.Entry(self, textvariable=self.messageContent)
      self.sendEntry.grid(row=1, column=0, padx=10, pady=10)

      self.sendButton = Tkinter.Button(self, text="Send", command=self.onSend)
      self.sendButton.grid(row=1, column=1, padx=10, pady=10)

      self.after(100, self.processMessages)

    def processMessages(self):
      while not self.queue.empty():
        message = self.queue.get_nowait()
        if message == None:
          self.quit()
          return
        self.log("Received %s" % message)

      self.after(100, self.processMessages)

    def onSend(self):
      text = '{"text": "' + self.messageContent.get() + '"}'
      self.log('Sending %s' % text)
      try:
        send_message(text)
      except IOError:
        tkMessageBox.showinfo('Native Messaging Example',
                              'Failed to send message.')
        sys.exit(1)

    def log(self, message):
      self.text.config(state=Tkinter.NORMAL)
      self.text.insert(Tkinter.END, message + "\n")
      self.text.config(state=Tkinter.DISABLED)


def Main():
  if not Tkinter:
    send_message('"Tkinter python module wasn\'t found. Running in headless ' +
                 'mode. Please consider installing Tkinter."')
    read_thread_func(None)
    sys.exit(0)

  queue = Queue.Queue()

  main_window = NativeMessagingWindow(queue)
  main_window.master.title('Native Messaging Example')

  thread = threading.Thread(target=read_thread_func, args=(queue,))
  thread.daemon = True
  thread.start()

  main_window.mainloop()

  sys.exit(0)


if __name__ == '__main__':
  Main()