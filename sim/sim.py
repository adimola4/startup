from requests import get, post

api_url_base = 'http://localhost:3000/api/'

def test_question_add():
    print(post(api_url_base + 'question/add',
         {
             'title': 'True False Example',
             'type': 'truefalse',
             'answer': 'true'
         }))

    print(post(api_url_base + 'question/add',
         {
             'title': 'American Example',
             'type': 'american',
             'choices': 'one;;two;;three;;four',
             'answer': 0 # The answer is 'one'
         }))

    print(post(api_url_base + 'question/add',
         {
             'title': 'Fill Blanks Example',
             'type': 'fillblanks',
             'choices': ";;7;;.log('foo bar');\nconsole.;;3;;('foo bar');",
             'answer': 'console;;log'
         }))

def test_questions_getall():
    print([i['ID'] for i in get(api_url_base + 'question/').json()])


def test_questions_getbyid(id):
    print(get(api_url_base + 'question/' + id).json())

if __name__ == "__main__":
    # test_question_add()
    test_questions_getall()
    test_questions_getbyid('3')

