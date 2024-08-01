const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
hourHand.style.transform = 'rotate(0deg)';
minuteHand.style.transform = 'rotate(0deg)';
secondHand.style.transform = 'rotate(0deg)';
setInterval(() => {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = (minutes * 6);
  const secondAngle = (seconds * 6);

  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `rotate(${secondAngle}deg)`;
}, 1000);
    let alarms = [];
    let editingAlarmId = null;
  
    if (localStorage.getItem('alarms')) {
      alarms = JSON.parse(localStorage.getItem('alarms'));
    }
  
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
      let alarm = JSON.parse(localStorage.getItem('alarm')) || [];
      checkAlarms(hours, minutes);
    }
  
    function checkAlarms(hours, minutes) {
      alarms.forEach(alarm => {
        if (alarm.hours === hours && alarm.minutes === minutes) {
        alert(`Alarm ringing for ${alarm.hours}:${alarm.minutes}!`);
        playAlarmSound();
        removeAlarm(alarm.id);
        }
      });
    }

    function playAlarmSound() {
    const audio = new Audio('mixkit-classic-alarm-995.wav');
    audio.play();
  }
  
    function saveAlarm(hours, minutes) {
      if (editingAlarmId === null) {
        alarms.push({ id: Date.now(), hours, minutes });
      } else {
        const alarm = alarms.find(a => a.id === editingAlarmId);
        if (alarm) {
          alarm.hours = hours;
          alarm.minutes = minutes;
        }
        editingAlarmId = null;
      }
      updateAlarmList();
      localStorage.setItem('alarms', JSON.stringify(alarms));
    }
  
    function setAlarm() {
      const alarmTime = document.getElementById('alarmTime').value;
      if (alarmTime) {
        const [hours, minutes] = alarmTime.split(':');
        saveAlarm(hours, minutes);
        document.getElementById('alarmTime').value = ''; 
      } else {
        alert('Please enter a valid time.');
      }
    }
  
    function editAlarm(id) {
      const alarm = alarms.find(a => a.id === id);
      if (alarm) {
        document.getElementById('alarmTime').value = `${alarm.hours}:${alarm.minutes}`;
        editingAlarmId = id; 
      }
    }
  
    function removeAlarm(id) {
      alarms = alarms.filter(a => a.id!== id);
      updateAlarmList();
      localStorage.setItem('alarms', JSON.stringify(alarms));
    }
  
    function updateAlarmList() {
      const alarmList = document.getElementById('alarmList');
      alarmList.innerHTML = '';
      localStorage.setItem('alarms', JSON.stringify(alarmList))
  
      alarms.forEach(alarm => {
        const li = document.createElement('li');
        li.textContent = `${alarm.hours}:${alarm.minutes}`;
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editAlarm(alarm.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => removeAlarm(alarm.id);
        
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        alarmList.appendChild(li);
      });
    }
    setInterval(updateClock, 1000);