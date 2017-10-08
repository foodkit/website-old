var submit = function (params) {
  return axios.post('https://api.ginja.co.th/api/v4/storefront/foodkit-leads', params)
}

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
        submit({email: this.email})
        this.$emit('next')
      }
    },
    closeModal: function () {
      this.$emit('closeModal')
    }
  },
  data: function () {
    return {
      email: '',
      errors: {}
    }
  },
  template: '\
  <section class="modal fade is-active" id="contact-us-step-one">\
  	<a class="modal-close" href="#!" v-on:click="closeModal">&times;</a>\
  	<div class="modal-content">\
      <div class="modal-body">\
      	<div>\
      		<form method="post">\
          	<div>\
            	<h2 style="text-align: center;">Want to learn more?</h2>\
  						<p style="text-align: center;">No hassle chat with a customer service officer.</p>\
          	</div>\
          	<div class="form-field">\
  		        <div class="form-input-container">\
  		          <input class="form-input" v-model="email" v-on:change="onFormChanged" type="email" placeholder="Business email address" autocomplete="off" required="required" />\
  		        </div>\
              <ul class="validation-messages" v-if="errors.email">\
  			        <li>\
  								<label for="email" role="alert" class="form-inline-message">Valid email address is required</label>\
  							</li>\
  		        </ul>\
      			</div>\
            <div>\
              <input v-on:click="onFormSubmitted" type="submit" class="btn btn-primary btn-lg badge-pill text-uppercase" value="Book Demo">\
            </div>\
          </form>\
        </div>\
        <div class="modal-footer"></div>\
      </div>\
    </div>\
  </section>\
  '
})


/**
 *
 */
Vue.component('contact-us-step-two', {
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
    },
    onFormSubmitted: function (e) {
      e.preventDefault()
      e.stopPropagation()
      submit({
        first_name: this.first_name,
        last_name: this.last_name,
        phone_number: this.phone_number,
        business_name: this.business_name
      })
      this.$emit('next')
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
  template: '\
  <section class="modal fade is-active" id="contact-us-step-two">\
  	<a class="modal-close" href="#!" v-on:click="closeModal">&times;</a>\
  	<div class="modal-content">\
      <div class="modal-body">\
      	<div>\
      		<form method="post">\
          	<div>\
            	<h2 style="text-align: center;">Schedule a free product demo now</h2>\
  						<p style="text-align: center;">Fill out the form below and a Foodkit sales representative will contact you. Or you can call us:</p>\
  						<ul class="contact-us row">\
                <li v-for="office in offices" class="col-md-6">{{ office.title }} {{ office.phone }}</li>\
  						</ul>\
          	</div>\
          	<div class="form-field">\
              <div class="row">\
                <div class="form-input-container col-md-6">\
                  <input class="form-input" id="first_name" v-model="first_name" type="text" placeholder="First name" autocomplete="off">\
                </div>\
                <div class="form-input-container col-md-6">\
    		          <input class="form-input" id="last_name" v-model="last_name" type="text" placeholder="Last name" autocomplete="off">\
    		        </div>\
              </div>\
  						<div class="form-input-container">\
  		          <input class="form-input" id="phone_number" v-model="phone_number" type="text" placeholder="Phone number" autocomplete="off">\
  		        </div>\
  						<div class="form-input-container">\
  		          <input class="form-input" id="business_name" v-model="business_name" type="text" placeholder="Business or company name" autocomplete="off">\
  		        </div>\
      			</div>\
            <div>\
              <input v-on:click="onFormSubmitted" type="submit" class="btn btn-primary btn-lg badge-pill text-uppercase" value="Book Demo">\
            </div>\
          </form>\
        </div>\
      </div>\
      <div class="modal-footer"></div>\
    </div>\
  </div>\
  </section>\
  '
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
    hide: function () {
      contactUs.step = null
    }
  },
  template: '\
  <div>\
    <contact-us-step-one v-if="step === \'one\'" v-on:closeModal="hide" v-on:next="stepTwo" />\
    <transition name="fade">\
      <contact-us-step-two v-if="step === \'two\'" v-on:closeModal="hide" v-on:next="hide" />\
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
    contactUs.stepOne()
    return false
  }
}
