<template>
  <transition name="aiagain-Challenge" v-if="visible">
    <div class="aiagain-Challenge">
      <div class="aiagain-Challenge-wrap bounceIn">
        <div class="aiagain-Challenge-head">
          <div class="aiagain-Challenge-head-userimg" v-bind:class="[data.type==2 ? 'aiagain-userimg1' : '']">
            <img :src="data.userimg"/>
          </div>
          <div class="aiagain-Challenge-head-title" v-bind:class="[data.type==1 ? 'aiagain-success-bg' : 'aiagain-fail-bg']"></div>
          <div class="aiagain-Challenge-head-bgShine bgShine-rotate" v-if="data.type==1"></div>
        </div>
        <div class="aiagain-Challenge-main">
          <p class="aiagain-Challenge-text" v-for="(x,k) in data.list">{{x}}</p>
        </div>
        <div class="aiagain-Challenge-again" @click.stop="toAgain">再玩一次</div>
        <div class="aiagain-wrap-bottom">
          <div class="aiagain-follow" @click.stop="toFollow">关注我们</div>
          <div class="aiagain-establish">我也要创建活动</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      visible: false
    };
  },
  components: {},
  computed: {},
  props: ["data"],
  watch: {
    data(data) {
      this.data = data;
    }
  },
  methods: {
    close() {
      this.visible = false;
    },
    toAgain(){
      if(typeof (this.data.toAgain)==='function'){
        this.close()
        this.data.toAgain()
      }
    },
    toFollow(){
      if(typeof (this.data.toFollow)==='function'){
        this.close()
        this.data.toFollow()
      }
    }
  }
};
</script>

<style scoped lang="scss">
.aiagain-Challenge {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  display: block;
  z-index: 100;
  overflow-y: auto;
  overscroll-behavior: contain;
  -weblit-overscroll-behavior: contain;
}

.aiagain-Challenge-wrap {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  text-align: center;
}

.aiagain-Challenge-head {
  width: 100%;
  height: 230px;
  margin: 0 auto;
  padding-top:20px;
  position: relative;
}
.aiagain-Challenge-head-userimg {
  width: 80px;
  height: 80px;
  border-radius: 80px;
  border: 3px solid #73d575;
  margin: 0 auto;
  overflow: hidden;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}
.aiagain-userimg1{
  border: 3px solid #B5B5B6;
}
.aiagain-Challenge-head-userimg img{
  width:100%;
  height: 100%;
}
.aiagain-Challenge-head-title {
  width: 320px;
  height: 96px;
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
}
.aiagain-success-bg{
  background: url("data:image/png;base64,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");
  background-size: 100% 100%;
}
.aiagain-fail-bg{
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhQAAACkCAMAAAD48UeLAAAAllBMVEUAAACtra6vr7CwsLCtra2xsbK1tbanp6e0tLWnp6eurq+1tbanp6ewsLG1tba1tba1tba1tbaysrOnp6e1tbanp6empqasrK21tbanp6enp6eioqJ7e3t5eXm1tbanp6czMzN1dXVgYGBycnJLS0uKiouZmZpAQECvr7B7e3uhoaGDg4OSkpNpaWlWVlasrKyNjY2WlpbDshgyAAAAHnRSTlMAETUfBkGP4PzyKaVwU/C4acl6zdmdiF/ku65Kt9P/8bHWAAAQF0lEQVR42uzZW2+CMBTAcUpp09DQW5rA01kDmk1d/P4fb8VdjI5tDmHjcn5vYvTFf84pmKxaRiL6Kn3F0g95vBrfzxK0OBmhecqK0jjOuZRSa2u9r5SCWwmlvLdWa8m5c6ZgsReSoDkhsYE2Aamt90rASJS3sRJnSpZTnCZTRHJWmFMGCv5D5bV0pkgxj39H8sI4rm0lYCpEZTWPdeB6+WMZZWVswSuYMOVjHAwnx+hIWjipK5gR4WVsA+fGCEhaOmlnVcMlZTGN4RBm+LxmwzcqzQ2eNjCHzoWCQ6NXD056WDQvHcND6I1o4ZY4HjoJy0uaoO9kzMm19HBW4cj4Ci25nc4TqL+mNIZxJTcrHBCfCAwDg+iitMmTdaMYRIeKF2u9X80YX/g9532bZH0Dgxo96f+ypsDzNZ0wUhwRN1KyWEMXGeN4isAuLoqQuDSwi8utgUX0pThLlifHrXGnii/rfoQYC+h+1izm+QWTAoZTh9bV6xqgCdEGBtaEVg2/ddzs9jACIZewRqjzMKA+UTShtYUPx/cL+8cGOmw29eEBot5RPIXWEcbg3czHxbBDIhokivrtwrb9xB4+CSdPAD9HUYdrDUSH8aKIhEyTucpKC0MbMIrd7vwrXngO56/qGcUxtA7woyacbOGX7Av35rbTOAxF0TKFClFNCyOk4enYcuw4N+f/P28mLWYndtyUJk5S1kOFippIPSvnZvh7l0PqdtwAGl+KhNX8hGTUwfAGM0IKhlwzsRTg4/6qyHY3om7EliKx0TO8L81L3lCNkCK/uhPJb5aiqSJ3NaO+TNlKhKVQddIjhcyvloLyHidS3qBphBSSOwTDrjgMvIHj3TQXv44UD0hhmtD5UpRNu5C5UoCkLQUp1wl4cL0UaTvCidXqO1KkdBv3osXLnqLB28jmpfKkkPiWQ1LkkIJUTQ6aD5EMSCFmkAIcV7+52MYqHL4Up9AaVwqFLiEohbr0+Ct+gxSNicJKkfFZpABvq9biIUJ7GZRCNZHQjhRIFNdJwYrSCK1bNb0eLUX+DSmqKaRYsxaPrweKhy9FcnrtSqEwToaksJHQQmo/ZAUfLYW+XgrbftBIVttbPL1TTHwp0pMOXSkkJof+6YNVpZAXwmxGS1F24izak3IEKcAKB9TtniLjj6S6EQBSfFGGpZADYS6cEVGGHvOwFLpTEaTTvsSTgp53K1tnxa0cvhR4qrUnRU1hKQTvRXQThabbpdC845V2UksEKcDhdUXL75c3mgdIYbs03ZFCCjyjvVIk3EHXpkyZE6OcLPqbUrjpiuF6PshMNBVvq2kt/jzTDPhSkDaFO30wkRDwpCg5yCuWURcmnJ4kMBwMSIHsUA0tLHH4NhHrqCHbGdMEpFDyprOPimthSt0SKxHUpqgxvIySQrTuzcglnhT08XuzOL8PNCfoCgpfCpx4AkgBJEKdcq4rapPKDD/fLoXE7zX5TC8FOG43i/K4o3mBFCk6Q0jhpOqAFAIX0Bengypc8kNSSP5JNnD5eFLQ4XWzINt3mpdMdRZOWc1dKbgh0CMFTFJQLCdkkAGgSWAkTbiQ1s4UV/eJJ8WiyeJp5tJR1RzkRIV2jj7dEhJYUyX4EOr/VFKQIGPlTAaqD/YYU3P4Rmdxv1PHfyonvKVzHm7RNgohKewyXLXLP00lBVFpryoHWgpIMT37K3cWd95OEAcyZzXvlQIJOyCFzep1+ukQoxPTScE+E0SKehYgohT0Pv/e+3FPs4OgFZRq7kshVbvdDEqRnWXQzmwxkRT2QobM0JYiqhR0+LuZl8cjzY9AUDLN+6SgNNwkQArCh8Mxw4lpsC0ISmHOGYgPVg+rTyR2mzl5eKMFyL/OFr4aDKVPr1hepRoFofscQoq2LIqCGGfr4GOl0GhRWvVJo3osw+Up5EfkCaJKKqy5k3M8uCMFFRrHpCEpzDVOpHwotFaK7Hxl1WsdoyX5CDUWP8WJBkhBkuuCKpvdseZmNVlCUpQtJ+p+L2xgZRW2x0qhzpOwcm+Auy/H+1xnITtaDkjBamb/CDeDFC1CUmC/UZ3fNgX5CCuDGcwpwk4xQKMlXpTZ+opXWg5I0YBNAKTIJMLXL0WCPIG3XfCPQkwPdKSZtx9BqjB0mUJyXkcV53mWAvL0TIvhSlHYFA0p0iYUjBp6pagwehiynUPp3wZPvxroP3JvSIF4JV2kwueisd/E5+GDlsOVwthvvi0F4udLIf6xd/ZdiQJRHB5EQ0hdtbTUdu5iigOYL9//yy2UdMFhEHlHeP7Zc9oyTjzc+7sziId/yI4K7ngA9wf5+7VMyoOVxGWPxxXLio1Xj3KkH5oqHidQ0CsprN+Aj1LsRXdI/uOxvTrPqJ9tcFUDh4kDEx3RYYcWeft0MRoITrw5wm+DPLQUm9/rDKWw8SRHLFHuvFLxxZ0UduAmB9iJLnzPqr2BVmCDwg06AUVUCjoluSOX2z42KIX/jfwoxZdvFXEjkOEAW+8y5u54MMOmSQNf4CpZ7L1vNTxt+JuDTSqgiEwhmj8eKGj6b3/+xGSAu9Swwys/bJl77fyAe7nvws+aHYihiOHz6tPivo55FNlZu99iITjrRUwfYikeYiQ1/BtSGObwllzufIZIQTe4vMRNDbZPFVvwywPlfu//XjvoBPg37fa0LMTt4zFiBV553oCARd7g36QXKgX/Ythtvvh7MhDY8SnBDvaZT0fHwPe4VpS/ATImhVDSMvcaK4GX5nAdkT/J4mVulz1XWNCK8DHjgDXgB+s6Jh4Mugl4Al6gLRONFIL0Ssvg0z/BsUMwoxlcN4iUAl8Nl6I9K3aCYs89OMDgR4c99hM8yj0tkVdSENqIFs/lfXkbLxaawdxu/Viy+wLqgVKEYYakhzWKEwK7/u8tOuF7hQNQ5LPk5hEdKR5nBPEwdulyu7Xecdl/vQYaAayDjn1yJ9zaGNdfYLRERhIpjCltqQVjUiDtM9hrwaRLCkOeK7SlBnRIQUhvLwDAaEvlYeqsRwqgM1PB5UhbKg84KHOZ5Io0eAEP2lJ1GPywGBIknyLh0vaPOgC/KAOJ5ED3DYtE2z9qAQMf6kwjGSMNFLjQ9o+6AFcsM51FNOwbbf+oDQw4FpnNIqsFXGj7R50AJGsthr9Rou0ftYJBOItO6nSpgJgq7Iq1iDiCiKWWlRIPHir6I4f3V4eJg/vv+2hUZ+v7EMFMTqqEb+B4hFDRd8755M+f5+enp+l0PB4Oe71OR5NlSSJiJEnWOr3hcDydPj0//5m81+YD248QhTroplSijqHi2wDn/Lunv+ece6lLsqEraZ3h2/TJNaTKlQRuoAyTK1Gb/jF6v0jgOoAK5Iuk9YZjV5DXqlUQBjdZaPdNHJ4S1e4fI7cYfGugyaU/wL4rO348PU8qogfEYR7/r9bxhtAq9o/++7cIb8NO+R6Iy4fbXibvtDwYxEJZkVjIS7iiAkOpo8LFBFIjurJrRymt5QgxWUpxwoQKFyoQKvqvTlUY10yF0NoxHBdbOiA26s3AuVIAKS1UuDI8TevvAkdX6xUjB4M7mEmRQs/gXmi2jCZOZeg9nAwCOfJqK9g90ieLN65zFBgqRpMm2HCF1Bm6mSP7ZAZ3MusKDnAJPIWECqZOe5X4lKOy6MoZF44+3IvSISH0FODJPVQwa2+buv5R1emyWKTVXM2kajC4G3XAuzqHhNDEHI2TqV/4IC2EdD903bTPwNKacQQh8YdTaQFicggVfThvTd3PjLSQlX7BPFlHRpMDiVA04kNTIDGMxgY7hs5hzknL38BfZGvELhmpIwW/ZNFTIQ7pQwV2DJ7tgDSdlR4kcS9hkJT577GokIbYR2qhEGGcK/Ppu2WBheKqYtzbSo6QmFk3QZ1I2D8AW0YQe7s/G4bl8kKazUoPATNGvxApYCERh3nuUghLxNYAPz3SaD68luFi8pfPPnZ+gzS8SD97YC8Qi0ShAkRGmHsLgjQ7a2qmbp8M/Ju4Kzh8wWB5SoFWuKyWkBwqhp1NXaQEcCxIk5mfgcOw+ep624s+ZGMFkZN3ESZsbSc9hhKIQpqMAmFYtn63FwxSsgy8WzQRR4ESti7iZEEYKmkwHRBgmDrPCfr5STGTufcH3k9MJVB0ENDkXbE5IOJigZgGy0cK/l3I2iyT7fP+WRdhGyCkySsVCxCzFRTcY6YTKf+8gjRdhFMWTGGYOEMEK9JcVIhAFM5syFQKZc7V6sRd5Bi7TJzgm7Z9cGgASaxALdJLsRh2CUfyLkL9MGGasC3w0Y6kflYQTUREY2mliP20NGmuQGwYRY7ClQkDbtDkLbE3iMYydSFGP60Uy1U34TOuxBxjOHGCmzTtDk0/A0hhhc3SSPFy3zPSekuIR6QT2Dna7pFECpxMxUBSKZS5Ru5FjhcuPFOZeaNMtLPH3VIgUVYYSaRQZ528jhb7B9uGpwkLYtDsnfP/7Z1di+owEIabphJT4s2GJDS9GM6FYqWw+P//3DkLB7KwVSeJcWszz71Q5O18z/QACI44VZxxigiBRCwqwn/sT7fMBBkKdJU7MjMNXGJEIb1jJa1a8B8wRScdAd9UTScBw3xnEOcTLwrFchMlrP84z9ERZkDWnHp8MQCK65+bHPdBFAXfwB2g2S8biiMgcU3lOMBxmh6mIOeSvpoLALyp+LxGu44ArX0wCYG0gsW0Rw9eCVbQogXOMC30yJHoirseC73z1IIF4JMPW/QpA/O00CNHIUgTTdMJCKQlIdeIaYo2L0nCczpO39ab0Ijag8zwh+cFFsegiUJlIQ0pXE7zPF8v8B3SBD7/zzIW8z6ixO3Sn7A8A/mOeIe9GFlMl0/AI1lqMFweQ6cpEt/Ey3GKKgnlZ3wGXoKou7idezrmGoK4pQn5J8eaHF6CIdeRf4vu8g9IQa/RUOjKl0eXaQd4FW51hkIcGmKR1kABsutDFkqjSRKIbwKXxq4o9ZCm5rUfHMx5CaWRfCU1CukdhZc4WquhLCa/mJmPMAdSRAzdThW1GD1+W6kIwqu+IRLgozK6jDR8g8SW0MNIFiL/kLeyZtDiqfJoI89n5CO0t2rsqZL9XDrG2914cMpa4zNVMpTqmQekEHrw3ljlxvV+z2lzsH53UGYQ5UyFBTxSG6uUO4y7lnNGIvhlWEJY6p+ae2jjyDGskDay8sWfVeKWlFquGR6jC/uUBTZhd2Qh1g4b7SABg+yyG6TS0wjEu9C1CiMMlxlSCEVe480IwkjPStm9X5OReEu60YqsW2PjbUlQa/ON4Uqn+w9FktgqvRWJvVJDk3Mbpl28TCRS4kxR/U74dlg8nsviL79ayji2ROd+yGKMrWcONASxNX7I4iOuRSprvni6XZiF7/ioIvdAy78bpdf4tSBFZqISug/053csBDRFE5tmlCH9wJYpLLVCNw7XuJkKD/8RVK7aPkyjJv0HOiVSE0xjLIWmT29UBRPwRfd4vF9Q86saehlS0nui8OQ6KsI9HtMU5Dpqwz+8UyHJddQG97y5D12hIprmL46Ehk/TjtrSAAAAAElFTkSuQmCC");
  background-size: 100% 100%;
}
.aiagain-Challenge-head-bgShine {
  position: absolute;
  top: -100px;
  left: -15px;
  width: 400px;
  height: 400px;
  background-image: url('https://hdg.faisys.com/image/light.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  border-radius: 50%;
}
.bgShine-rotate{
  animation: bgRotate 6s linear infinite;
  -webkit-animation: bgRotate 6s linear infinite;
}
@keyframes bgRotate {
  0% {
      transform: rotate(0deg);
  }

  100% {
      transform: rotate(360deg);
  }
}
.aiagain-Challenge-main{
  width:100%;
  text-align: center;
  margin-top: 20px;
}
.aiagain-Challenge-text{
  font-size: 16px;
  line-height: 30px;
  color:#fff;
}
.aiagain-Challenge-again{
  width:275px;
  height: 40px;
  line-height: 40px;
  border-radius: 2px;
  background: #fe8208;
  color:#fff;
  position: fixed;
	bottom: 120px;
	left: 50%;
	transform: translateX(-50%);
}
</style>

