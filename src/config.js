const routes = {
    'common': {
        'js': 'views/commonJS',
        'css' : 'views/commonCSS',
    },
    'home' : {
        'html' : 'views/HomeScreen/HomeHTML',
        'js' : 'views/HomeScreen/HomeJS',
        'css' : 'views/HomeScreen/HomeCSS'
    },
    'landing':{ 
        'html' : 'views/Landing/LandingHTML',
        'js' : 'views/Landing/LandingJS',
        'css' : 'views/Landing/LandingCSS'
    }
}

const db = {
    'fileId' : '1n66CRzw1U2StCKpoKH7XhoVyapyKzuRNDOTnxFy3Emg',
    'tables' : {
        'users' : {
            'sheetName' : 'users',
            'columns' : ['username', 'email', 'role', 'createdAt', 'updatedAt']
        }
    }
}