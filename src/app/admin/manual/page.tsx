"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  BookOpen,
  Database,
  Rocket,
  ChevronDown,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  AlertTriangle,
  Lock,
  Ban,
} from "lucide-react";

type SectionTab = {
  id: string;
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
};

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left font-semibold text-base cursor-pointer"
      >
        {open ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
        {title}
      </button>
      {open && (
        <div className="px-5 py-4 text-base leading-relaxed text-foreground/80">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AdminManualPage() {
  const [activeTab, setActiveTab] = useState("admin");

  const tabs: SectionTab[] = [
    {
      id: "admin",
      title: "Админ хуудас",
      icon: BookOpen,
      content: <AdminGuide />,
    },
    {
      id: "supabase",
      title: "Supabase",
      icon: Database,
      content: <SupabaseGuide />,
    },
    {
      id: "deploy",
      title: "Deploy (Vercel)",
      icon: Rocket,
      content: <DeployGuide />,
    },
  ];

  const active = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="min-h-screen bg-surface">
      <AdminHeader />

      <div className="p-4 sm:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Гарын авлага</h1>
          <p className="text-base text-muted-foreground mt-2">
            Системийн удирдлага, тохиргоо, deploy хийх заавар
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 mb-8 border-b border-border pb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-base font-medium rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white border border-border border-b-white text-primary -mb-px"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
          {active.content}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   АДМИН ХУУДАСНЫ ГАРЫН АВЛАГА
   ───────────────────────────────────────────────────────────────────────────── */
function AdminGuide() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">
        Админ хуудасны гарын авлага
      </h2>
      <p className="text-base text-foreground/70">
        Энэ хуудсаар дамжуулан вэб сайтын бүх контентыг удирдана. Доорх
        хэсгүүдийг нэг бүрчлэн уншина уу.
      </p>

      <CollapsibleSection title="1. Нэвтрэх" defaultOpen>
        <div className="space-y-3">
          <p>
            <strong>Хаяг:</strong>{" "}
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
              /admin/login
            </code>
          </p>
          <p>
            Нууц үгээ оруулж нэвтэрнэ. Нууц үг нь Vercel-ийн environment
            variable-д (
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
              ADMIN_PASSWORD
            </code>
            ) хадгалагдсан байна.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-800 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              Нууц үгээ мартсан бол Vercel dashboard → Settings → Environment
              Variables хэсгээс{" "}
              <code className="font-mono text-sm">ADMIN_PASSWORD</code>-г
              шинэчилж, дахин deploy хийнэ.
            </span>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="2. Мэдээ удирдах">
        <div className="space-y-4">
          <p className="font-semibold text-lg">Мэдээний жагсаалт</p>
          <p>
            Дээд хэсэгт статистик харагдана: Нийт мэдээ, Идэвхтэй, Идэвхгүй,
            Ангилалын тоо.
          </p>
          <p>
            Хайлт, ангилал шүүлтүүр, төлөв шүүлтүүр ашиглан мэдээ хайж болно.
          </p>

          <p className="font-semibold text-lg mt-4">Шинэ мэдээ нэмэх</p>
          <ol className="list-decimal list-inside space-y-2 ml-3">
            <li>
              Баруун дээд буланд байрлах{" "}
              <strong>&ldquo;+ Мэдээ нэмэх&rdquo;</strong> товч дарна
            </li>
            <li>
              <strong>Тохиргоо:</strong> Ангилал сонгоно, Нийтлэгдсэн/Ноорог
              төлөв сонгоно
            </li>
            <li>
              <strong>Зураг:</strong> Баннер зураг болон мэдээний зураг upload
              хийнэ (эсвэл URL оруулна)
            </li>
            <li>
              <strong>PDF:</strong> Хэрэв PDF файл хавсаргах бол upload хийнэ
            </li>
            <li>
              <strong>Гарчиг:</strong> Монгол гарчиг (заавал), Англи гарчиг
              оруулна
            </li>
            <li>
              <strong>Агуулга:</strong> Rich text editor ашиглан Монгол, Англи
              агуулга бичнэ. Зураг, хүснэгт, видео оруулах боломжтой
            </li>
            <li>
              Дээд буланд байрлах <strong>&ldquo;Хадгалах&rdquo;</strong> товч
              дарна
            </li>
          </ol>

          <p className="font-semibold text-lg mt-4">Мэдээ засах</p>
          <p className="flex items-center gap-1 flex-wrap">
            Жагсаалтын баруун талд байрлах{" "}
            <strong className="inline-flex items-center gap-1">
              харандаа дүрс <Pencil className="inline h-4 w-4" />
            </strong>
            дарна. Мэдээний бүх мэдээллийг засах боломжтой.
          </p>

          <p className="font-semibold text-lg mt-4">Мэдээ устгах</p>
          <p className="flex items-center gap-1 flex-wrap">
            Жагсаалтын баруун талд байрлах{" "}
            <strong className="inline-flex items-center gap-1">
              хогийн савны дүрс{" "}
              <Trash2 className="inline h-4 w-4 text-destructive" />
            </strong>
            дарна. Баталгаажуулах цонх гарна — &ldquo;Устгах&rdquo; дарвал
            бүрмөсөн устна. Энэ үйлдлийг буцаах боломжгүй!
          </p>

          <p className="font-semibold text-lg mt-4">
            Идэвхжүүлэх / Идэвхгүйжүүлэх
          </p>
          <p>
            Жагсаалтын <strong>&ldquo;Төлөв&rdquo;</strong> баганад байрлах товч
            дарна. Идэвхгүй мэдээ вэб сайтад харагдахгүй болно.
          </p>

          <p className="font-semibold text-lg mt-4">Эрэмбэлэх</p>
          <p>
            Хүснэгтийн толгой хэсгийн{" "}
            <strong>Гарчиг, Ангилал, Огноо, Төлөв</strong> дээр дарж эрэмбэлж
            болно (өсөх/буурах).
          </p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="3. Багш нарын мэдээлэл удирдах">
        <div className="space-y-4">
          <p className="font-semibold text-lg">Багш нэмэх</p>
          <ol className="list-decimal list-inside space-y-2 ml-3">
            <li>
              <strong>&ldquo;+ Багш нэмэх&rdquo;</strong> товч дарна
            </li>
            <li>
              <strong>Ангилал</strong> сонгоно (жишээ: Удирдлага, Профессор гэх
              мэт)
            </li>
            <li>
              <strong>Эрэмбэ</strong> тоо оруулна (жагсаалтад харагдах дараалал)
            </li>
            <li>
              <strong>Зураг</strong> upload хийнэ (эсвэл URL оруулна)
            </li>
            <li>
              <strong>Нэр</strong> (Монгол, Англи) — заавал оруулна
            </li>
            <li>
              <strong>Албан тушаал</strong> (Монгол, Англи)
            </li>
            <li>
              <strong>Боловсрол</strong> (Монгол, Англи)
            </li>
            <li>
              <strong>Ажлын туршлага</strong> (Монгол, Англи)
            </li>
            <li>
              <strong>Судалгааны чиглэл</strong> (Монгол, Англи)
            </li>
            <li>
              <strong>&ldquo;Нэмэх&rdquo;</strong> товч дарна
            </li>
          </ol>

          <p className="font-semibold text-lg mt-4">Багш засах</p>
          <p className="flex items-center gap-1 flex-wrap">
            Жагсаалтаас{" "}
            <strong className="inline-flex items-center gap-1">
              харандаа дүрс <Pencil className="inline h-4 w-4" />
            </strong>{" "}
            дарна. Бүх мэдээллийг засах боломжтой.
          </p>

          <p className="font-semibold text-lg mt-4">Багш устгах</p>
          <p className="flex items-center gap-1 flex-wrap">
            <strong className="inline-flex items-center gap-1">
              Хогийн савны дүрс{" "}
              <Trash2 className="inline h-4 w-4 text-destructive" />
            </strong>{" "}
            дарна → Баталгаажуулна.
          </p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="4. Гадаад харилцаа удирдах">
        <div className="space-y-4">
          <p>Гадаад хамтын ажиллагааны сургуулиудын мэдээллийг удирдана.</p>

          <p className="font-semibold text-lg">Шинэ хамтын ажиллагаа нэмэх</p>
          <ol className="list-decimal list-inside space-y-2 ml-3">
            <li>
              Баруун дээд буланд байрлах <strong>&ldquo;+ Нэмэх&rdquo;</strong>{" "}
              товч дарна
            </li>
            <li>Засварлах маягт нээгдэнэ:</li>
            <li>
              <strong>Гарчиг (MN):</strong> Сургуулийн нэр Монголоор
            </li>
            <li>
              <strong>Title (EN):</strong> Сургуулийн нэр Англиар
            </li>
            <li>
              <strong>Тайлбар (MN):</strong> Хамтын ажиллагааны дэлгэрэнгүй
              тайлбар Монголоор
            </li>
            <li>
              <strong>Description (EN):</strong> Тайлбар Англиар
            </li>
            <li>
              <strong>Зураг:</strong> Сургуулийн лого/зураг upload хийнэ (эсвэл
              URL оруулна)
            </li>
            <li>
              <strong>&ldquo;Хадгалах&rdquo;</strong> товч дарна
            </li>
          </ol>

          <p className="font-semibold text-lg mt-4">Засах</p>
          <p className="flex items-center gap-1 flex-wrap">
            Жагсаалтаас{" "}
            <strong className="inline-flex items-center gap-1">
              харандаа дүрс <Pencil className="inline h-4 w-4" />
            </strong>{" "}
            дарна. Дээрх маягт нээгдэж бүх мэдээллийг засах боломжтой (зураг
            солих, текст өөрчлөх гэх мэт).
          </p>

          <p className="font-semibold text-lg mt-4">Устгах</p>
          <p className="flex items-center gap-1 flex-wrap">
            <strong className="inline-flex items-center gap-1">
              Хогийн савны дүрс{" "}
              <Trash2 className="inline h-4 w-4 text-destructive" />
            </strong>{" "}
            дарна → &ldquo;Устгах&rdquo; баталгаажуулна. Буцаах боломжгүй!
          </p>

          <p className="font-semibold text-lg mt-4">
            Идэвхжүүлэх / Идэвхгүйжүүлэх
          </p>
          <p>
            Жагсаалтын <strong>төлөв товч</strong> дарна. Идэвхгүй болгосон
            хамтын ажиллагаа вэб сайтад харагдахгүй.
          </p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="5. Бусад контент удирдах">
        <div className="space-y-4">
          <p>
            &ldquo;Бусад&rdquo; хуудсанд <strong>2 таб</strong> байна:
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-4 space-y-3">
            <p className="font-semibold text-lg text-blue-900">
              Таб 1: Эрдмийн чуулган
            </p>
            <p className="text-blue-800">
              Эрдмийн чуулганы хуудасны контентыг удирдана:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3 text-blue-800">
              <li>
                <strong>Үндсэн текст:</strong> Тайлбар (Монгол, Англи) —
                textarea-д бичнэ
              </li>
              <li>
                <strong>Архивын холбоосууд:</strong> Гарчиг (MN, EN) оруулна
              </li>
              <li>
                <strong>Холбоос нэмэх:</strong> &ldquo;+ Холбоос нэмэх&rdquo;
                товч дарна. Нэр (MN, EN) болон URL оруулна. PDF файл upload хийх
                боломжтой (PDF товч дарна)
              </li>
              <li>
                <strong>Холбоос устгах:</strong> Холбоосын баруун дээд буланд
                байрлах хогийн савны дүрс дарна
              </li>
              <li>
                Бүх өөрчлөлтийг <strong>&ldquo;Хадгалах&rdquo;</strong> товч
                дарж хадгална
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg px-5 py-4 space-y-3 mt-4">
            <p className="font-semibold text-lg text-green-900">
              Таб 2: Бааз эмнэлгүүд
            </p>
            <p className="text-green-800">
              Бааз эмнэлгүүдийн жагсаалтыг удирдана:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-3 text-green-800">
              <li>
                <strong>Эмнэлэг нэмэх:</strong> &ldquo;+ Эмнэлэг нэмэх&rdquo;
                товч дарна. Нэр (MN) болон Name (EN) оруулна
              </li>
              <li>
                <strong>Эмнэлэг засах:</strong> Жагсаалтаас шууд нэрийг засна
                (input талбарт)
              </li>
              <li>
                <strong>Эмнэлэг устгах:</strong> Баруун талын хогийн савны дүрс
                дарна
              </li>
              <li>
                Бүх өөрчлөлтийг <strong>&ldquo;Хадгалах&rdquo;</strong> товч
                дарж хадгална
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-800 mt-3 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              &ldquo;Хадгалах&rdquo; товч дарахгүйгээр хуудаснаас гарвал
              өөрчлөлт алга болно!
            </span>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUPABASE ГАРЫН АВЛАГА
   ───────────────────────────────────────────────────────────────────────────── */
function SupabaseGuide() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">
        Supabase гарын авлага
      </h2>
      <p className="text-base text-foreground/70">
        Supabase бол мэдээллийн сан (database), файл хадгалалт (storage) зэргийг
        хариуцдаг backend үйлчилгээ юм.
      </p>

      <CollapsibleSection title="1. Supabase Dashboard нэвтрэх" defaultOpen>
        <div className="space-y-3">
          <ol className="list-decimal list-inside space-y-2 ml-3">
            <li>
              <a
                href="https://supabase.com"
                className="text-primary underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                supabase.com
              </a>{" "}
              хаягаар орно
            </li>
            <li>
              <strong>&ldquo;Sign In&rdquo;</strong> дарна →{" "}
              <strong>&ldquo;Continue with GitHub&rdquo;</strong> сонгоно
            </li>
            <li>GitHub account-аар нэвтэрнэ</li>
            <li>Project жагсаалтаас өөрийн project-г сонгоно</li>
          </ol>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="2. Мэдээллийн сан (Table Editor)">
        <div className="space-y-3">
          <p>
            Зүүн цэснээс <strong>&ldquo;Table Editor&rdquo;</strong> сонгоно.
          </p>
          <p className="font-semibold">Үндсэн хүснэгтүүд:</p>
          <ul className="list-disc list-inside ml-3 space-y-2">
            <li>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                news
              </code>{" "}
              — Мэдээний хүснэгт (гарчиг, агуулга, ангилал, зураг, PDF)
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                faculty
              </code>{" "}
              — Багш нарын хүснэгт (нэр, зураг, боловсрол, туршлага)
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                collaborations
              </code>{" "}
              — Гадаад харилцааны хүснэгт (сургуулийн нэр, тайлбар, зураг)
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                site_content
              </code>{" "}
              — Вэб сайтын бусад контент (эрдмийн чуулган, бааз эмнэлгүүд)
            </li>
          </ul>
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-800 mt-3 flex items-start gap-2">
            <Ban className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              Хүснэгтийн бүтцийг (column нэмэх/устгах/нэр солих) өөрчлөхгүй
              байна уу! Код дээр алдаа гарч вэб сайт ажиллахгүй болно.
            </span>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="3. Файл хадгалалт (Storage)">
        <div className="space-y-3">
          <p>
            Зүүн цэснээс <strong>&ldquo;Storage&rdquo;</strong> сонгоно.
          </p>
          <p>Зураг, PDF зэрэг файлууд энд хадгалагдана. Bucket-ууд:</p>
          <ul className="list-disc list-inside ml-3 space-y-1">
            <li>Мэдээний зураг, баннер</li>
            <li>Багш нарын зураг</li>
            <li>Гадаад харилцааны зураг</li>
            <li>PDF файлууд</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-800 mt-3 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              Bucket-ийн нэрийг өөрчлөхгүй байна уу. Файл устгахдаа болгоомжтой
              — устгасан файл вэб сайтад харагдахгүй болно.
            </span>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="4. API түлхүүрүүд">
        <div className="space-y-3">
          <p>
            <strong>Settings → API</strong> хэсгээс харна:
          </p>
          <ul className="list-disc list-inside ml-3 space-y-2">
            <li>
              <strong>Project URL</strong> →{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                NEXT_PUBLIC_SUPABASE_URL
              </code>
            </li>
            <li>
              <strong>anon/public key</strong> →{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code>
            </li>
            <li>
              <strong>service_role key</strong> →{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                SUPABASE_SERVICE_ROLE_KEY
              </code>
            </li>
          </ul>
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-800 mt-3 flex items-start gap-2">
            <Lock className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              <strong>service_role key</strong> нь хамгийн нууц түлхүүр! Хэзээ ч
              бусдад өгөхгүй, frontend код дотор ашиглахгүй.
            </span>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="5. Нөөцлөлт (Backup)">
        <div className="space-y-3">
          <p>Supabase Pro plan дээр автомат өдөр бүрийн backup байдаг.</p>
          <p>Гараар backup хийх:</p>
          <ol className="list-decimal list-inside space-y-1 ml-3">
            <li>
              Dashboard → <strong>Settings → Database</strong>
            </li>
            <li>&ldquo;Backups&rdquo; хэсгээс татна</li>
          </ol>
        </div>
      </CollapsibleSection>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DEPLOY (VERCEL) ГАРЫН АВЛАГА
   ───────────────────────────────────────────────────────────────────────────── */
function DeployGuide() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-foreground">
        Deploy (Vercel) гарын авлага
      </h2>
      <p className="text-base text-foreground/70">
        Вэб сайт Vercel дээр байрладаг. GitHub-д код push хийхэд автоматаар
        deploy хийгдэнэ.
      </p>

      <CollapsibleSection title="1. Автомат Deploy (хамгийн чухал)" defaultOpen>
        <div className="space-y-3">
          <p>
            GitHub-ийн{" "}
            <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
              main
            </code>{" "}
            branch руу код push хийхэд Vercel автоматаар deploy хийнэ.
          </p>
          <p className="font-semibold">Процесс:</p>
          <ol className="list-decimal list-inside space-y-2 ml-3">
            <li>Код өөрчлөлт хийнэ</li>
            <li>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                git add .
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                git commit -m &quot;тайлбар&quot;
              </code>
            </li>
            <li>
              <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                git push origin main
              </code>
            </li>
            <li>Vercel автоматаар build + deploy хийнэ (ихэвчлэн 1-3 минут)</li>
          </ol>
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-800 mt-3 flex items-start gap-2">
            <Eye className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              Амжилттай deploy хийгдсэн бол Vercel dashboard дээр ногоон
              &ldquo;Ready&rdquo; гэж харагдана.
            </span>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="2. Vercel Dashboard нэвтрэх">
        <div className="space-y-3">
          <ol className="list-decimal list-inside space-y-2 ml-3">
            <li>
              <a
                href="https://vercel.com"
                className="text-primary underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com
              </a>{" "}
              хаягаар орно
            </li>
            <li>
              <strong>&ldquo;Log In&rdquo;</strong> →{" "}
              <strong>&ldquo;Continue with GitHub&rdquo;</strong> сонгоно
            </li>
            <li>GitHub account-аар нэвтэрнэ</li>
            <li>Project сонгоно</li>
          </ol>
          <p className="mt-3">
            <strong>Deployments таб:</strong> Бүх deploy-ийн түүх харагдана
            (амжилттай, алдаатай)
          </p>
          <p>
            <strong>Settings таб:</strong> Environment variables, domain
            тохиргоо
          </p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="3. Environment Variables">
        <div className="space-y-3">
          <p>
            <strong>Settings → Environment Variables</strong> хэсэгт дараах
            утгууд байна:
          </p>
          <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
            <p>NEXT_PUBLIC_SUPABASE_URL</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
            <p>SUPABASE_SERVICE_ROLE_KEY</p>
            <p>ADMIN_PASSWORD</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-800 mt-3 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              Environment variable өөрчилсний дараа{" "}
              <strong>заавал redeploy</strong> хийх шаардлагатай. Deployments
              таб → хамгийн сүүлийн deploy → &ldquo;...&rdquo; →
              &ldquo;Redeploy&rdquo;
            </span>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="4. Domain тохиргоо">
        <div className="space-y-3">
          <p>
            <strong>Settings → Domains</strong> хэсэгт:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-3">
            <li>Custom domain нэмэх (жишээ: graduate.mnums.edu.mn)</li>
            <li>Vercel-ээс өгсөн DNS тохиргоог хийнэ (CNAME эсвэл A record)</li>
            <li>SSL сертификат автоматаар үүснэ</li>
          </ol>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="5. Deploy алдаа гарвал">
        <div className="space-y-3">
          <p>
            <strong>Deployments</strong> таб дээрээс улаан &ldquo;Error&rdquo;
            гэсэн deploy дарна.
          </p>
          <p>Build log-оос алдааг харна.</p>
          <p className="font-semibold mt-2">Түгээмэл алдаа:</p>
          <ul className="list-disc list-inside ml-3 space-y-1">
            <li>
              <strong>TypeScript type алдаа</strong> → Код засах шаардлагатай
              (хөгжүүлэгчид хандана)
            </li>
            <li>
              <strong>Environment variable дутуу</strong> → Vercel Settings-ээс
              нэмнэ
            </li>
            <li>
              <strong>Build timeout</strong> → Дахин deploy хийнэ
            </li>
          </ul>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-blue-800 mt-3 flex items-start gap-2">
            <Rocket className="h-5 w-5 shrink-0 mt-0.5" />
            <span>
              <strong>Хурдан шийдэл (Rollback):</strong> Deployments → Өмнөх
              амжилттай deploy → &ldquo;...&rdquo; → &ldquo;Promote to
              Production&rdquo; дарвал хуучин хувилбар руу буцна.
            </span>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
