const {
  ipcRenderer
} = require('electron');
const startButton = document.getElementById('startBot');
const stopButton = document.getElementById('stop');
const pageArticle  = document.getElementById('page_article');

const linkAccount = document.getElementById('link_account');
const artikel = document.getElementById('artikel');
const keywordFileInput = document.getElementById('keywordFile');
const proxyCheckBox = document.getElementById("proxyC")
const proxy = document.getElementById("proxy")
const desktop = document.getElementById('desktop');
const android = document.getElementById('android');
const iphone = document.getElementById('iphone');
const random = document.getElementById('random');
const whoer = document.getElementById('whoer');
const headlessCheckbox = document.getElementById('headless');
const recentPost = document.getElementById('recent_post');
const loop = document.getElementById('loop');
const scrollmin = document.getElementById('scrollmin');
const scrollmax = document.getElementById('scrollmax');
const scrollminAds = document.getElementById('scrollminAds');
const scrollmaxAds = document.getElementById('scrollmaxAds');
const version = document.getElementById('version')
const warp = document.getElementById('warp');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
const loaderDownload = document.getElementById('warp-loader')

const googlebanner = document.getElementById('google_banner')
const popUnder = document.getElementById('popUnder')
const socialbar = document.getElementById('socialbar')
const inpage = document.getElementById('inpage')

const tiktok = document.getElementById('tiktok')
const youtube = document.getElementById('youtube')
const instagram = document.getElementById('instagram')
const twitter = document.getElementById('twitter')
const snapcat = document.getElementById('snapcat')
const ipsaya = document.getElementById('ipsaya')
const captchaApiKey = document.getElementById('captchaApiKey')
const linkDirect = document.getElementById('link_direct')
const facebook = document.getElementById('facebook')
const pinterest = document.getElementById('pinterest')



document.addEventListener('change', () => {
  if (proxyCheckBox.checked) {
    proxy.disabled=false
  } else {
    proxy.disabled=true
    
  }
})


startButton.addEventListener('click', () => {
  const keywordFilePath = keywordFileInput.files[0]?.path;
  if (keywordFilePath == undefined) {
    keywordFileInput.style.border = '1px solid red'
    return;
  } 

  const pageArticles = pageArticle.checked

  const linkAccounts = linkAccount.checked
  const artikels = artikel.checked
  const proxyC = proxyCheckBox.checked
  const proxys = proxy.value
  const desktops = desktop.checked
  const androids = android.checked
  const iphones = iphone.checked
  const randoms = random.checked
  const whoers = whoer.checked
  const view = headlessCheckbox.checked ? false : 'new';
  const recentPosts = recentPost.checked
  const loops = loop.value
  const scrollmins = scrollmin.value
  const scrollmaxs = scrollmax.value
  const scrollminAdss = scrollminAds.value
  const scrollmaxAdss = scrollmaxAds.value
  
  const googlebanners = googlebanner.checked
  const popUnders = popUnder.checked
  const socialbars = socialbar.checked
  const inpages = inpage.checked

  const tiktoks = tiktok.checked
  const youtubes = youtube.checked
  const instagrams = instagram.checked
  const twitters = twitter.checked
  const snapcats = snapcat.checked
  const ipsayas = ipsaya.checked
  const captchaApiKeys = captchaApiKey.value
  const linkDirects = linkDirect.checked
  const facebooks = facebook.checked
  const pinterests = pinterest.checked
  
  ipcRenderer.send('button-click', keywordFilePath, pageArticles, linkAccounts, artikels, proxyC, proxys, desktops, androids, iphones, randoms, whoers, view, recentPosts, loops, scrollmins, scrollmaxs, scrollminAdss, scrollmaxAdss, googlebanners, tiktoks, youtubes, instagrams, twitters, snapcats, ipsayas, captchaApiKeys, linkDirects, facebooks, pinterests, popUnders, socialbars, inpages);
});
stopButton.addEventListener('click', () => {
  if (confirm("Realy want to stop the proccess ?") == true) {
      ipcRenderer.send('stop');
  }
});
ipcRenderer.on('log', (event, logs) => {
  const logTextarea = document.getElementById('log');
  logTextarea.value = logs;
  logTextarea.scrollTop = logTextarea.scrollHeight;
});


const all =[
pageArticle,
linkAccount,
artikel,
keywordFileInput,
proxyCheckBox,
proxy,
desktop,
android,
iphone,
random,
whoer,
headlessCheckbox,
recentPost,
loop,
scrollmin,
scrollmax,
scrollminAds,
scrollmaxAds,
googlebanner,
tiktok,
youtube,
instagram,
twitter,
snapcat,
ipsaya,
linkDirect,
facebook,
pinterest,
popUnder,
socialbar,
inpage,
]

ipcRenderer.on('run',()=>{
  all.forEach((e)=>{
    e.disabled=true
  })
})
ipcRenderer.on('foor',()=>{
  all.forEach((e)=>{
    e.disabled=false
  })
})

let updateProgress = 0;

ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, arg) => {
    version.innerText = 'v' + arg.version;
});

ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    message.innerText = 'A new update is available. Downloading now...';
    warp.classList.remove('hidden');
    loaderDownload.classList.remove('hidden');
});

ipcRenderer.on('update_progress', (event, progress) => {
    updateProgress = progress;
    const progsDown = document.getElementById('download-progress')
    progsDown.style.width = updateProgress + '%'
    progsDown.setAttribute('aria-valuenow', updateProgress)
});

ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
    restartButton.classList.remove('hidden');
    warp.classList.remove('hidden');

    loaderDownload.classList.add('hidden');
});

restartButton.addEventListener("click", (e) => {
    ipcRenderer.send('restart_app');
})

