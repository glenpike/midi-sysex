import _ from 'lodash'
import template from 'lodash/template'

// _.templateSettings.interpolate = /<%= ([\s\S]+?) %>/g

const sliderMarkup = `<div>
	<input type="range" id="<%= id %>" data-address="<%= address %>" name="<%= name %>" min="<%= range[0] %>" max="<%= range[1] %>">
	<label for="<%= id %>"><%= label %></label>
</div>`

const slider = template(sliderMarkup)

const createSlider = (options) => slider(options)

export {
	createSlider
}
