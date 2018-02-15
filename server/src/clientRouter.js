import express from 'express';
import path from 'path';

export default (app) => {
    app.use('/public', express.static(path.join(__dirname, '../public')));
    app.use('/dist', express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
}