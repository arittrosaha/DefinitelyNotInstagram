import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { closeModal } from '../actions/modal_actions';
import { createFollow } from '../actions/follows_actions';
import { deleteFollow } from '../actions/follows_actions';
