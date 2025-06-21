import React from "react";

function FAQ() {
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">FAQ</h2>
            <div className="accordion " id="faqAccordion">
                <div className="accordion-item mb-4 shadow">
                    <h2 className="accordion-header" id="faq1">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse1"
                            aria-expanded="true"
                            aria-controls="collapse1"
                        >
                            Data apa yang harus saya masukkan?
                        </button>
                    </h2>
                    <div
                        id="collapse1"
                        className="accordion-collapse collapse show"
                        aria-labelledby="faq1"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Anda hanya memasukkan jam tidur, bangun, dan
                            tanggal.
                        </div>
                    </div>
                </div>

                <div className="accordion-item mb-4 shadow">
                    <h2 className="accordion-header" id="faq2">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse2"
                            aria-expanded="false"
                            aria-controls="collapse2"
                        >
                            Berapa batas maksimal data yang bisa saya masukkan?
                        </button>
                    </h2>
                    <div
                        id="collapse2"
                        className="accordion-collapse collapse"
                        aria-labelledby="faq2"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Anda bisa memasukkan waktu tidur maksimal 7 hari
                            sebelum hari sekarang.
                        </div>
                    </div>
                </div>

                <div className="accordion-item mb-4 shadow">
                    <h2 className="accordion-header" id="faq3">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse3"
                            aria-expanded="false"
                            aria-controls="collapse3"
                        >
                            Bagaimana sistem menganalisis kualitas tidur saya?
                        </button>
                    </h2>
                    <div
                        id="collapse3"
                        className="accordion-collapse collapse"
                        aria-labelledby="faq3"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Sistem menghitung durasi tidur dari waktu tidur
                            hingga bangun, lalu mengklasifikasikan kualitas
                            tidur Anda seperti "Kurang tidur", "Tidur sehat",
                            atau "Kelebihan tidur".
                        </div>
                    </div>
                </div>

                <div className="accordion-item mb-4 shadow">
                    <h2 className="accordion-header" id="faq4">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse4"
                            aria-expanded="false"
                            aria-controls="collapse4"
                        >
                            Apakah saya bisa melihat riwayat tidur saya?
                        </button>
                    </h2>
                    <div
                        id="collapse4"
                        className="accordion-collapse collapse"
                        aria-labelledby="faq4"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Ya, Anda bisa melihat riwayat tidur mingguan dalam
                            bentuk tabel dan grafik. Anda juga dapat memilih
                            minggu tertentu untuk ditampilkan.
                        </div>
                    </div>
                </div>

                <div className="accordion-item mb-4 shadow">
                    <h2 className="accordion-header" id="faq5">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse5"
                            aria-expanded="false"
                            aria-controls="collapse5"
                        >
                            Apakah saya perlu login untuk menggunakan aplikasi?
                        </button>
                    </h2>
                    <div
                        id="collapse5"
                        className="accordion-collapse collapse"
                        aria-labelledby="faq5"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Ya, Anda perlu membuat akun dan login untuk
                            menyimpan data tidur Anda. Hal ini menjaga privasi
                            dan keamanan data Anda.
                        </div>
                    </div>
                </div>

                <div className="accordion-item mb-4 shadow">
                    <h2 className="accordion-header" id="faq6">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse6"
                            aria-expanded="false"
                            aria-controls="collapse6"
                        >
                            Apakah data saya aman?
                        </button>
                    </h2>
                    <div
                        id="collapse6"
                        className="accordion-collapse collapse"
                        aria-labelledby="faq6"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Ya, sistem menggunakan token autentikasi (JWT) dan
                            validasi input untuk menjaga keamanan dan keaslian
                            data Anda.
                        </div>
                    </div>
                </div>

                <div className="accordion-item mb-4 shadow">
                    <h2 className="accordion-header" id="faq7">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse7"
                            aria-expanded="false"
                            aria-controls="collapse7"
                        >
                            Bagaimana cara logout dari aplikasi?
                        </button>
                    </h2>
                    <div
                        id="collapse7"
                        className="accordion-collapse collapse"
                        aria-labelledby="faq7"
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body">
                            Anda bisa logout dengan menekan tombol "Logout" yang
                            akan menghapus sesi login dan mencegah akses tanpa
                            autentikasi.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
