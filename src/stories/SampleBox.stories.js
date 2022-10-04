import React from 'react';

import { SampleBox } from './SampleBox';

export default {
	title: 'Custom/SampleBox',
	component: SampleBox,
};

const Template = (args) => <SampleBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	children: 'hello',
};
