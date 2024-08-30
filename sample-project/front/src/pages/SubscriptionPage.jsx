import React, { useEffect, useState } from 'react';
import './SubscriptionPage.css';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';


const SubscriptionPage = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fonction pour récupérer l'ID utilisateur après le montage du composant
        const fetchUserData = async () => {
            try {
                const userIdResponse = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
                const userId = userIdResponse.data.userId;
                setUserId(userId);
    
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            }
        };
    
        fetchUserData();
    }, []);

    const handleSubscription = async () => {
        try {
            if (!userId) {
                alert('User ID non trouvé. Veuillez vous connecter à nouveau.');
                return;
            }

            const subscriptionResponse = await axios.get(`http://localhost:8000/subscription/get/${userId}`);

            if (subscriptionResponse.status === 201) {
                const subscriptionResponse = await axios.post(
                    'http://localhost:8000/subscription/create', 
                    { user_id: userId, price: 20, date: new Date() }
                );
                console.log('Subscription created:', subscriptionResponse.data);
            } else {
                const response = await axios.put(
                    'http://localhost:8000/subscription/update',
                    { user_id: userId }
                );
                console.log(response.data);
                alert('Espace de stockage acheté avec succès.');
            }

            window.location.href = '/';

        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'abonnement:', error);
            alert('Erreur lors de l\'achat de l\'espace de stockage.');
        }
        
        try{
            const response = await axios.post(
                'http://localhost:8000/invoice/create',
                { user_id: userId }
            );
            console.log(response.data);
            alert('Facture créée avec succès.');
        }catch(error){
            console.error('Erreur lors de la création de la facture:', error);
            alert('Erreur lors de la création de la facture.');
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5 mb-5 ">
            <Card style={{ width: '40rem' }} className="p-4">
                <Form>
                    <h2 className="mt-4">Moyen de payement</h2>
                    <div className="d-flex ">
                        <svg style={{ marginRight: '1%' }} width="48" height="48" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><rect width="48" height="32" rx="4" fill="url(#PaymentTypeCB_svg__a)"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M15.868 15.636v.604h8.915v.009c0 2-.555 4.21-2.16 5.521-1.61 1.314-4.274 1.729-6.732 1.729-2.53 0-5.155-.368-6.774-1.751C7.594 20.448 7 18.19 7 16.249c0-1.853.303-3.915 1.707-5.197C10.335 9.564 13.253 9 15.891 9c2.534 0 5.371.514 6.99 1.901 1.36 1.164 1.808 2.977 1.888 4.735h-8.9Zm9.498.604h12.381v-.003c1.812.09 3.253 1.68 3.253 3.513a3.422 3.422 0 0 1-3.253 3.415v.01H25.366V16.24Zm15.407-3.783a3.195 3.195 0 0 1-2.924 3.179H25.366V9.28h11.85c.118-.013.268.01.39.01 1.766 0 3.167 1.4 3.167 3.167Z" fill="#FEFEFE"></path><defs><linearGradient id="PaymentTypeCB_svg__a" x1="18.803" y1="-11.55" x2="-0.217" y2="27.972" gradientUnits="userSpaceOnUse"><stop stop-color="#02245A"></stop><stop offset="0.309" stop-color="#016598"></stop><stop offset="0.638" stop-color="#018D9C"></stop><stop offset="1" stop-color="#13973E"></stop></linearGradient></defs></svg>
                        <svg style={{ marginRight: '1%' }} width="48" height="48" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="#fff"></rect><path d="M14.437 27.248V25.7c0-.591-.36-.979-.978-.979-.31 0-.646.103-.877.439-.18-.282-.439-.439-.826-.439a.83.83 0 0 0-.72.36v-.308h-.54v2.474h.54V25.88c0-.438.23-.645.591-.645.36 0 .54.231.54.645v1.367h.54V25.88c0-.438.26-.645.592-.645.36 0 .54.231.54.645v1.367h.598Zm8.017-2.474h-.877v-.748h-.54v.748h-.49v.489h.49v1.135c0 .567.23.9.85.9.23 0 .489-.077.669-.18l-.156-.465a.864.864 0 0 1-.466.13c-.258 0-.36-.157-.36-.412v-1.108h.877v-.49h.003Zm4.587-.055a.733.733 0 0 0-.645.36v-.308h-.54v2.474h.54V25.85c0-.41.18-.645.516-.645.102 0 .231.027.337.051l.156-.516c-.108-.021-.262-.021-.364-.021Zm-6.932.259c-.258-.18-.619-.259-1.006-.259-.619 0-1.03.31-1.03.8 0 .41.31.645.85.72l.258.027c.282.05.438.129.438.258 0 .18-.207.31-.567.31s-.646-.13-.826-.259l-.258.411c.282.207.67.31 1.057.31.72 0 1.135-.337 1.135-.799 0-.438-.336-.67-.85-.748l-.258-.027c-.231-.027-.411-.078-.411-.23 0-.181.18-.283.465-.283.31 0 .618.129.775.207l.228-.438Zm14.378-.259a.733.733 0 0 0-.645.36v-.308h-.54v2.474h.54V25.85c0-.41.18-.645.516-.645.102 0 .231.027.337.051l.156-.51c-.105-.027-.259-.027-.364-.027Zm-6.905 1.292c0 .747.516 1.288 1.315 1.288.36 0 .618-.078.877-.283l-.259-.438a1.032 1.032 0 0 1-.645.231c-.439 0-.748-.309-.748-.798 0-.466.31-.775.748-.8.231 0 .438.079.645.232l.258-.438c-.258-.207-.516-.282-.876-.282-.799-.003-1.315.54-1.315 1.288Zm4.999 0v-1.237h-.54v.309c-.18-.231-.439-.36-.775-.36-.697 0-1.237.54-1.237 1.288 0 .747.54 1.288 1.237 1.288.36 0 .618-.13.774-.36v.309h.54V26.01Zm-1.985 0c0-.439.282-.8.748-.8.438 0 .747.337.747.8 0 .438-.309.798-.747.798-.463-.027-.748-.363-.748-.798ZM24.13 24.72c-.72 0-1.237.516-1.237 1.288 0 .774.517 1.288 1.264 1.288.36 0 .72-.102 1.006-.337l-.258-.387a1.228 1.228 0 0 1-.72.258c-.337 0-.67-.156-.748-.591h1.828v-.207c.024-.796-.441-1.313-1.135-1.313Zm0 .465c.336 0 .567.207.618.591H23.46c.052-.333.283-.591.67-.591Zm13.427.826v-2.216h-.54v1.288c-.18-.231-.439-.36-.775-.36-.697 0-1.237.54-1.237 1.288 0 .747.54 1.288 1.237 1.288.36 0 .618-.13.774-.36v.309h.54V26.01Zm-1.985 0c0-.439.282-.8.748-.8.438 0 .747.337.747.8 0 .438-.309.798-.747.798-.466-.027-.748-.363-.748-.798Zm-18.092 0v-1.237h-.54v.309c-.18-.231-.44-.36-.775-.36-.697 0-1.237.54-1.237 1.288 0 .747.54 1.288 1.237 1.288.36 0 .618-.13.774-.36v.309h.54V26.01Zm-2.009 0c0-.439.282-.8.748-.8.438 0 .747.337.747.8 0 .438-.309.798-.747.798-.466-.027-.748-.363-.748-.798Z" fill="#000"></path><path d="M28.047 5.985H19.93V20.57h8.118V5.985Z" fill="#FF5A00"></path><path d="M20.47 13.277A9.304 9.304 0 0 1 24 5.985 9.228 9.228 0 0 0 18.277 4 9.272 9.272 0 0 0 9 13.277a9.272 9.272 0 0 0 9.277 9.278c2.165 0 4.15-.748 5.723-1.985a9.259 9.259 0 0 1-3.53-7.293Z" fill="#EB001B"></path><path d="M39 13.277a9.272 9.272 0 0 1-9.277 9.278A9.228 9.228 0 0 1 24 20.57a9.227 9.227 0 0 0 3.53-7.293A9.304 9.304 0 0 0 24 5.985 9.213 9.213 0 0 1 29.72 4C34.85 4 39 8.176 39 13.277Z" fill="#F79E1B"></path><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" stroke="#E0E0E0"></rect></svg>
                        <svg style={{ marginRight: '1%' }} width="48" height="48" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><g clip-path="url(#PaymentTypeAmericanExpress_svg__a)"><rect width="48" height="32" rx="4" fill="#016FD0"></rect><path d="M9.295 25.365v-7.517h7.96l.853 1.113.882-1.113H48v6.998s-.875.511-1.749.519H30.254l-.963-1.185v1.185h-3.155v-2.023s-.43.282-1.362.282H23.7v1.74h-4.777l-.853-1.136-.866 1.137h-7.91ZM0 12.182l1.795-4.185h3.104l1.018 2.344V7.997h3.86l.606 1.694.587-1.694h17.321v.852s.911-.852 2.407-.852l5.62.02 1.002 2.313V7.997h3.229l.888 1.33v-1.33h3.26v7.518h-3.26l-.851-1.334v1.334h-4.744l-.478-1.185H34.09l-.47 1.184h-3.217a3.18 3.18 0 0 1-2.11-.834v.835H23.44l-.962-1.185v1.185H4.439l-.477-1.185H2.691l-.473 1.184H0v-3.332Z" fill="#fff"></path><path d="M2.43 8.924.01 14.553h1.575l.447-1.127H4.63l.444 1.127h1.611L4.265 8.924H2.43Zm.896 1.31.791 1.97H2.532l.794-1.97Zm3.525 4.318V8.923l2.24.008 1.302 3.63 1.272-3.638h2.222v5.629h-1.408v-4.148l-1.491 4.148H9.754l-1.496-4.148v4.148H6.85Zm7.998 0V8.923h4.592v1.26h-3.17v.962h3.096v1.185h-3.096v1h3.17v1.222H14.85Zm5.407-5.628v5.629h1.407v-2h.593l1.687 2h1.72l-1.852-2.074a1.714 1.714 0 0 0 1.544-1.729c0-1.184-.93-1.826-1.968-1.826h-3.131Zm1.407 1.26h1.608c.386 0 .667.3.667.592 0 .373-.364.592-.646.592h-1.629v-1.185Zm5.703 4.368h-1.437V8.923h1.437v5.629Zm3.407 0h-.31c-1.501 0-2.412-1.182-2.412-2.791 0-1.65.9-2.838 2.796-2.838h1.555v1.333H30.79c-.77 0-1.313.6-1.313 1.518 0 1.09.622 1.548 1.518 1.548h.37l-.592 1.23Zm3.062-5.628-2.421 5.629h1.576l.447-1.127h2.596l.445 1.127h1.61L35.67 8.924h-1.835Zm.895 1.31.792 1.97h-1.586l.794-1.97Zm3.523 4.318V8.923h1.789l2.284 3.537V8.922h1.407v5.629h-1.73l-2.343-3.63v3.63h-1.407Zm-27.995 9.85v-5.629h4.591v1.26h-3.17v.962h3.096v1.185H11.68v1h3.17v1.222h-4.592Zm22.5 0v-5.629h4.591v1.26h-3.17v.962h3.081v1.185h-3.08v1h3.17v1.222h-4.593Zm-17.73 0 2.235-2.78-2.289-2.849h1.773l1.363 1.762 1.368-1.762h1.704l-2.26 2.815 2.24 2.814H19.39l-1.324-1.733-1.291 1.733h-1.747Zm6.302-5.628v5.629h1.444v-1.777h1.481c1.254 0 2.204-.666 2.204-1.959 0-1.07-.746-1.893-2.021-1.893H21.33Zm1.444 1.273h1.56c.405 0 .694.248.694.648 0 .376-.288.648-.699.648h-1.555v-1.296Zm4.296-1.274v5.629h1.407v-2h.592l1.687 2h1.72l-1.851-2.074a1.714 1.714 0 0 0 1.543-1.729c0-1.184-.93-1.826-1.967-1.826H27.07Zm1.407 1.26h1.608c.386 0 .667.301.667.592 0 .374-.364.592-.646.592h-1.63v-1.185ZM38 24.401V23.18h2.816c.417 0 .597-.225.597-.472 0-.237-.18-.476-.597-.476h-1.273c-1.106 0-1.722-.674-1.722-1.686 0-.902.564-1.773 2.208-1.773h2.74l-.592 1.267h-2.37c-.453 0-.592.237-.592.465 0 .233.172.49.518.49h1.333c1.233 0 1.768.7 1.768 1.616 0 .984-.596 1.79-1.835 1.79h-2.999Zm5.165 0V23.18h2.816c.416 0 .597-.225.597-.472 0-.237-.18-.476-.597-.476h-1.273c-1.106 0-1.722-.674-1.722-1.686 0-.902.564-1.773 2.208-1.773h2.74l-.592 1.267h-2.37c-.453 0-.593.237-.593.465 0 .233.172.49.519.49h1.333c1.233 0 1.768.7 1.768 1.616 0 .984-.596 1.79-1.835 1.79h-3Z" fill="#016FD0"></path></g><defs><clipPath id="PaymentTypeAmericanExpress_svg__a"><rect width="48" height="32" rx="4" fill="#fff"></rect></clipPath></defs></svg>
                        <svg width="48" height="48" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="#fff"></rect><path d="m19.428 10.216-4.976 11.869h-3.245l-2.449-9.47c-.148-.584-.277-.798-.73-1.043-.738-.4-1.957-.776-3.028-1.01l.073-.344h5.225c.665 0 1.265.443 1.415 1.211l1.293 6.868 3.196-8.08h3.226v-.001Zm12.716 7.996c.014-3.133-4.332-3.306-4.302-4.705.01-.425.415-.879 1.302-.993.44-.058 1.652-.101 3.028.53l.538-2.518A8.273 8.273 0 0 0 29.84 10c-3.037 0-5.172 1.613-5.19 3.925-.02 1.708 1.524 2.662 2.688 3.23 1.197.582 1.6.956 1.593 1.474-.008.796-.954 1.148-1.839 1.162-1.543.024-2.438-.418-3.152-.75l-.556 2.6c.716.329 2.042.616 3.414.632 3.228 0 5.337-1.593 5.347-4.061Zm8.016 3.875H43l-2.48-11.871H37.9c-.59 0-1.087.342-1.307.87l-4.607 10.999h3.224l.641-1.774h3.939l.37 1.776Zm-3.426-4.206 1.617-4.457.93 4.457h-2.547Zm-12.92-7.665-2.54 11.869h-3.069l2.54-11.87h3.069Z" fill="#1434CB"></path><rect x="0.5" y="0.5" width="47" height="31" rx="3.5" stroke="#E0E0E0"></rect></svg>
                    </div>
                    <Form.Group className="mb-3" controlId="formCardNumber">
                        <Form.Label>Numéro de carte</Form.Label>
                        <Form.Control type="text" placeholder="1234 5678 9012 3456" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formExpiryDate">
                        <Form.Label>Date d'expiration</Form.Label>
                        <Form.Control type="text" placeholder="MM/YY" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCVC">
                        <Form.Label>CVC / CVV</Form.Label>
                        <Form.Control type="text" placeholder="3 digits" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCardName">
                        <Form.Label>Nom inscrit sur la carte</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleSubscription}>
                        Confirmer et acheter de l'espace
                    </Button>
                </Form>
            </Card>

        </Container>
    );
};

export default SubscriptionPage;