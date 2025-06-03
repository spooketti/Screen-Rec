let mediaRecorder;
    let recordedChunks = [];

    async function startRecording() {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      

      recordedChunks = [];

      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        let vidType = document.getElementById("fileType").options[document.getElementById("fileType").selectedIndex].text;
        let rawVidType = vidType
        if(vidType=="mkv")
        {
            vidType = "x-matroska;codecs=avc1"
        }
        if(vidType=="avi")
        {
             vidType = "x-msvideo" //im aware theres a better way to do this
        }
        const blob = new Blob(recordedChunks, { type: `video/${vidType}` });
        const url = URL.createObjectURL(blob);
        
        let download = document.getElementById('result');
        download.href = url;
        download.download = `recording.${rawVidType}`;
        // a.click();
        // URL.revokeObjectURL(url);
      };

      mediaRecorder.start();
      document.getElementById('start').disabled = true;
      document.getElementById('stop').disabled = false;
    };

    document.getElementById('stop').onclick = () => {
      mediaRecorder.stop();
      document.getElementById('start').disabled = false;
      document.getElementById('stop').disabled = true;
    };