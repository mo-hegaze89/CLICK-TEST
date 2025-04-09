let totalClicks = 0;
let testDuration = 10; // مدة الاختبار بالثواني
let testInterval;
let testStartTime;

// شاشة تسجيل الدخول
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  // بعد التحقق من صحة البيانات (يمكنك حفظها أو معالجتها)
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
});

// عند الضغط على زر بدء الاختبار
document.getElementById('start-btn').addEventListener('click', function() {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('countdown-screen').style.display = 'flex';
  startCountdown();
});

// العد التنازلي
function startCountdown() {
  let count = 3;
  const countdownEl = document.getElementById('countdown-number');
  countdownEl.innerText = count;
  const countdownTimer = setInterval(() => {
    count--;
    if(count > 0){
      countdownEl.innerText = count;
    } else {
      clearInterval(countdownTimer);
      startTest();
    }
  }, 1000);
}

// بدء الاختبار
function startTest() {
  document.getElementById('countdown-screen').style.display = 'none';
  document.getElementById('test-screen').style.display = 'flex';
  totalClicks = 0;
  testStartTime = Date.now();
  document.getElementById('timer').innerText = testDuration;
  
  // بدء مؤقت الاختبار
  let remaining = testDuration;
  testInterval = setInterval(() => {
    remaining--;
    document.getElementById('timer').innerText = remaining;
    if (remaining <= 0) {
      clearInterval(testInterval);
      endTest();
    }
  }, 1000);
}

// عند الضغط على الزر الكبير خلال الاختبار
document.getElementById('click-button').addEventListener('click', function() {
  totalClicks++;
});

// إنهاء الاختبار وعرض النتيجة
function endTest() {
  document.getElementById('test-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'flex';
  
  let elapsedTime = (Date.now() - testStartTime) / 1000;
  let cps = (totalClicks / elapsedTime).toFixed(2);
  
  document.getElementById('total-clicks').innerText = totalClicks;
  document.getElementById('cps').innerText = cps;
}

// إعادة الاختبار
document.getElementById('restart-btn').addEventListener('click', function() {
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
});

// تبديل الوضع الفاتح/الداكن عبر المفتاح
document.getElementById('modeToggle').addEventListener('change', function() {
  if(this.checked) {
    document.body.classList.add('dark');
    document.getElementById('modeLabel').innerText = "وضع داكن";
  } else {
    document.body.classList.remove('dark');
    document.getElementById('modeLabel').innerText = "وضع فاتح";
  }
});
