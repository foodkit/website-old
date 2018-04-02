var hubspotCookie = function () {
  var name = 'hubspotutk';
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

var submit = function (params) {
  return axios.post(window.data.contactFormEndpoint, params)
}

var track = function (event) {
  if (typeof ga !== 'undefined') {
    console.log('track()...', event)
    ga('send', 'event', 'Contact us', event);
  } else {
    console.log('... could not find ga()!')
  }
}

var trackConversion = function () {
  console.log('trackConversion()...')
  if (typeof gtag_report_conversion !== 'undefined') {
    gtag_report_conversion()
  } else {
    console.log('... could not find gtag_report_conversion()!')
  }
}

// Share email between components:
var _email

/**
 *
 */
Vue.component('contact-us-step-one', {
  methods: {
    onFormChanged: function () {
      // https://stackoverflow.com/questions/4964691/super-simple-email-validation-with-javascript
      this.$set(this.errors, 'email', !(/(.+)@(.+){2,}\.(.+){2,}/.test(this.email)))
    },
    onFormSubmitted: function () {
      this.onFormChanged()
      if (!this.errors.email) {
        submit({email: this.email, hubspot_cookie: hubspotCookie()})
        _email = this.email
        this.$emit('next')
        trackConversion()
        track('step-one-submit')
      }
    },
    closeModal: function () {
      this.$emit('closeModal')
      track('close-modal')
    }
  },
  data: function () {
    return {
      email: '',
      errors: {}
    }
  },
  template: '#contact-us-step-one-template'
})


/**
 *
 */
Vue.component('contact-us-step-two', {
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
      track('close-modal')
    },
    onFormSubmitted: function (e) {
      e.preventDefault()
      e.stopPropagation()
      submit({
        email: _email,
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number,
        business_name: this.business_name,
        hubspot_cookie: hubspotCookie()
      })
      this.$emit('next')
      track('step-two-submit')
    }
  },
  data: function () {
    return {
      first_name: '',
      last_name: '',
      phone_number: '',
      business_name: '',
      errors: {},
      offices: window.data.offices
    }
  },
  template: '#contact-us-step-two-template'
})

/**
 *
 */
Vue.component('contact-us-step-three', {
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
      track('close-modal')
    },
    onFormSubmitted: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.$emit('next')
      track('step-three-submit')
    }
  },
  template: '#contact-us-step-three-template'
})

/**
 *
 */
var contactUs = new Vue({
  el: '#contact-us',
  data: {
    step: null
  },
  methods: {
    stepOne: function () {
      contactUs.step = 'one'
    },
    stepTwo: function () {
      contactUs.step = 'two'
    },
    stepThree: function () {
      contactUs.step = 'three'
    },
    hide: function () {
      contactUs.step = null
    }
  },
  template: '\
  <div>\
    <contact-us-step-one v-if="step === \'one\'" v-on:closeModal="hide" v-on:next="stepTwo" />\
    <contact-us-step-two v-if="step === \'two\'" v-on:closeModal="hide" v-on:next="stepThree" />\
    <transition name="fade">\
      <contact-us-step-three v-if="step === \'three\'" v-on:closeModal="hide" v-on:next="hide" />\
    </transition>\
  </div>\
  '
})

/**
 *
 */
var elements = document.getElementsByClassName('btn-cta')
for (var i=0 ; i<elements.length ; i++) {
  elements[i].onclick = function () {
    track('cta-button-click')
    contactUs.stepOne()
    return false
  }
}

if (/*@cc_on!@*/false) {
  document.documentElement.className+=' ie10';
}

if (!!window.MSInputMethodContext && !!document.documentMode) {
  document.documentElement.className+=' ie11';
}
